<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

$allowedOrigins = [
    'https://m3hive.com',
    'https://www.m3hive.com',
];

$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($requestOrigin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
|
| Actual secret keys are NOT stored in this file.
|
| On cPanel they will be stored here:
|
| /home/YOUR_CPANEL_USERNAME/m3hive-secrets.php
|
| contact.php is located at:
|
| /home/YOUR_CPANEL_USERNAME/public_html/api/contact.php
|
*/

$secretsPath = dirname(__DIR__, 2) . '/m3hive-secrets.php';

$secrets = [];

if (is_readable($secretsPath)) {

    $loadedSecrets = require $secretsPath;

    if (is_array($loadedSecrets)) {
        $secrets = $loadedSecrets;
    }
}

/*
|--------------------------------------------------------------------------
| LOAD KEYS
|--------------------------------------------------------------------------
|
| First try server environment variables.
| If unavailable, use the private cPanel secrets file.
|
*/

$resendApiKey =
    getenv('RESEND_API_KEY') ?:
    ($secrets['RESEND_API_KEY'] ?? '');

$recaptchaSecretKey =
    getenv('RECAPTCHA_SECRET_KEY') ?:
    ($secrets['RECAPTCHA_SECRET_KEY'] ?? '');

/*
|--------------------------------------------------------------------------
| CHECK CONFIGURATION
|--------------------------------------------------------------------------
*/

if (!$resendApiKey) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Email service is not configured.'
    ]);

    exit;
}

if (!$recaptchaSecretKey) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Security service is not configured.'
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| EMAIL SETTINGS
|--------------------------------------------------------------------------
*/

$CONTACT_EMAIL = 'hello@m3hive.com';

$FROM_EMAIL =
    'M3 Hive Website <website@m3hive.com>';

/*
|--------------------------------------------------------------------------
| HELPER FUNCTIONS
|--------------------------------------------------------------------------
*/

function respond($statusCode, $data)
{
    http_response_code($statusCode);

    echo json_encode($data);

    exit;
}

function clean($value)
{
    return trim(
        (string)($value ?? '')
    );
}

function escapeHtmlValue($value)
{
    return htmlspecialchars(
        $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

/*
|--------------------------------------------------------------------------
| READ REQUEST
|--------------------------------------------------------------------------
*/

$rawBody =
    file_get_contents('php://input');

$data =
    json_decode($rawBody, true);

if (!is_array($data)) {

    respond(400, [
        'success' => false,
        'message' => 'Invalid request.'
    ]);
}

/*
|--------------------------------------------------------------------------
| FORM VALUES
|--------------------------------------------------------------------------
*/

$firstName =
    clean($data['firstName'] ?? '');

$lastName =
    clean($data['lastName'] ?? '');

$email =
    clean($data['email'] ?? '');

$country =
    clean($data['country'] ?? '');

$interest =
    clean($data['interest'] ?? '');

$company =
    clean($data['company'] ?? '');

$phone =
    clean($data['phone'] ?? '');

$journeyStage =
    clean($data['journeyStage'] ?? '');

$timeline =
    clean($data['timeline'] ?? '');

$message =
    clean($data['message'] ?? '');

$honeypot =
    clean($data['honeypot'] ?? '');

$recaptchaToken =
    clean($data['recaptchaToken'] ?? '');

/*
|--------------------------------------------------------------------------
| HONEYPOT
|--------------------------------------------------------------------------
*/

if ($honeypot !== '') {

    respond(200, [
        'success' => true,
        'message' => 'Thank you.'
    ]);
}

/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

if (
    $firstName === '' ||
    $lastName === '' ||
    $email === '' ||
    $country === '' ||
    $message === ''
) {

    respond(400, [
        'success' => false,
        'message' =>
            'Please complete all required fields.'
    ]);
}

if (!filter_var(
    $email,
    FILTER_VALIDATE_EMAIL
)) {

    respond(400, [
        'success' => false,
        'message' =>
            'Please enter a valid email address.'
    ]);
}

if ($recaptchaToken === '') {

    respond(400, [
        'success' => false,
        'message' =>
            'Security verification failed. Please try again.'
    ]);
}

/*
|--------------------------------------------------------------------------
| VERIFY GOOGLE RECAPTCHA
|--------------------------------------------------------------------------
*/

$recaptchaPostData =
    http_build_query([
        'secret' =>
            $recaptchaSecretKey,

        'response' =>
            $recaptchaToken,

        'remoteip' =>
            $_SERVER['REMOTE_ADDR'] ?? ''
    ]);

$recaptchaCurl =
    curl_init(
        'https://www.google.com/recaptcha/api/siteverify'
    );

curl_setopt_array(
    $recaptchaCurl,
    [
        CURLOPT_POST => true,

        CURLOPT_POSTFIELDS =>
            $recaptchaPostData,

        CURLOPT_RETURNTRANSFER =>
            true,

        CURLOPT_TIMEOUT =>
            15,

        CURLOPT_HTTPHEADER => [
            'Content-Type: application/x-www-form-urlencoded'
        ]
    ]
);

$recaptchaResponse =
    curl_exec($recaptchaCurl);

$recaptchaError =
    curl_error($recaptchaCurl);

curl_close($recaptchaCurl);

/*
|--------------------------------------------------------------------------
| RECAPTCHA REQUEST ERROR
|--------------------------------------------------------------------------
*/

if ($recaptchaResponse === false) {

    error_log(
        'reCAPTCHA request failed: ' .
        $recaptchaError
    );

    respond(500, [
        'success' => false,
        'message' =>
            'Security verification is temporarily unavailable.'
    ]);
}

/*
|--------------------------------------------------------------------------
| CHECK RECAPTCHA RESULT
|--------------------------------------------------------------------------
*/

$recaptchaResult =
    json_decode(
        $recaptchaResponse,
        true
    );

$recaptchaSuccess =
    isset($recaptchaResult['success']) &&
    $recaptchaResult['success'] === true;

$recaptchaAction =
    $recaptchaResult['action'] ?? '';

$recaptchaScore =
    isset($recaptchaResult['score'])
        ? (float)$recaptchaResult['score']
        : 0;

/*
|--------------------------------------------------------------------------
| RECAPTCHA V3 REQUIREMENTS
|--------------------------------------------------------------------------
*/

if (
    !$recaptchaSuccess ||
    $recaptchaAction !== 'contact_form' ||
    $recaptchaScore < 0.5
) {

    respond(403, [
        'success' => false,
        'message' =>
            'Security verification failed. Please try again.'
    ]);
}

/*
|--------------------------------------------------------------------------
| SAFE EMAIL CONTENT
|--------------------------------------------------------------------------
*/

$safeFirstName =
    escapeHtmlValue($firstName);

$safeLastName =
    escapeHtmlValue($lastName);

$safeEmail =
    escapeHtmlValue($email);

$safeCountry =
    escapeHtmlValue($country);

$safeInterest =
    escapeHtmlValue(
        $interest !== ''
            ? $interest
            : 'Not specified'
    );

$safeCompany =
    escapeHtmlValue($company);

$safePhone =
    escapeHtmlValue($phone);

$safeJourneyStage =
    escapeHtmlValue($journeyStage);

$safeTimeline =
    escapeHtmlValue($timeline);

$safeMessage =
    nl2br(
        escapeHtmlValue($message)
    );

/*
|--------------------------------------------------------------------------
| SUBJECT
|--------------------------------------------------------------------------
*/

$subject =
    'New M3 Hive enquiry from ' .
    $firstName .
    ' ' .
    $lastName .
    ($company !== '' ? ' (' . $company . ')' : '');

/*
|--------------------------------------------------------------------------
| EMAIL HTML
|--------------------------------------------------------------------------
*/

$companyRow = $safeCompany !== '' ? <<<ROW
<tr>
<td style="padding:10px 0;font-weight:bold;border-bottom:1px solid #eeeeee;">
Company
</td>
<td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
{$safeCompany}
</td>
</tr>
ROW : '';

$phoneRow = $safePhone !== '' ? <<<ROW
<tr>
<td style="padding:10px 0;font-weight:bold;border-bottom:1px solid #eeeeee;">
Phone
</td>
<td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
{$safePhone}
</td>
</tr>
ROW : '';

$stageRow = $safeJourneyStage !== '' ? <<<ROW
<tr>
<td style="padding:10px 0;font-weight:bold;border-bottom:1px solid #eeeeee;">
Journey Stage
</td>
<td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
{$safeJourneyStage}
</td>
</tr>
ROW : '';

$timelineRow = $safeTimeline !== '' ? <<<ROW
<tr>
<td style="padding:10px 0;font-weight:bold;border-bottom:1px solid #eeeeee;">
Timeline
</td>
<td style="padding:10px 0;border-bottom:1px solid #eeeeee;">
{$safeTimeline}
</td>
</tr>
ROW : '';

$emailHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">

<title>
New M3 Hive Website Enquiry
</title>

</head>

<body style="
margin:0;
padding:0;
background:#f4f4f4;
font-family:Arial,Helvetica,sans-serif;
color:#161616;
">

<div style="
max-width:680px;
margin:30px auto;
background:#ffffff;
border-radius:12px;
overflow:hidden;
border:1px solid #e5e5e5;
">

<div style="
background:#111111;
padding:24px 30px;
border-bottom:5px solid #ffcc00;
">

<h1 style="
margin:0;
color:#ffffff;
font-size:22px;
">

New Website Enquiry

</h1>

<p style="
margin:8px 0 0;
color:#cccccc;
font-size:13px;
">

M3 Hive Enquiry Workflow

</p>

</div>

<div style="padding:30px;">

<table
cellpadding="0"
cellspacing="0"
style="
width:100%;
border-collapse:collapse;
font-size:14px;
"
>

<tr>

<td style="
padding:10px 0;
font-weight:bold;
width:180px;
border-bottom:1px solid #eeeeee;
">

Name

</td>

<td style="
padding:10px 0;
border-bottom:1px solid #eeeeee;
">

{$safeFirstName} {$safeLastName}

</td>

</tr>

<tr>

<td style="
padding:10px 0;
font-weight:bold;
border-bottom:1px solid #eeeeee;
">

Email

</td>

<td style="
padding:10px 0;
border-bottom:1px solid #eeeeee;
">

{$safeEmail}

</td>

</tr>

{$companyRow}

{$phoneRow}

<tr>

<td style="
padding:10px 0;
font-weight:bold;
border-bottom:1px solid #eeeeee;
">

Country

</td>

<td style="
padding:10px 0;
border-bottom:1px solid #eeeeee;
">

{$safeCountry}

</td>

</tr>

<tr>

<td style="
padding:10px 0;
font-weight:bold;
border-bottom:1px solid #eeeeee;
">

Area of Interest

</td>

<td style="
padding:10px 0;
border-bottom:1px solid #eeeeee;
">

{$safeInterest}

</td>

</tr>

{$stageRow}

{$timelineRow}

</table>

<div style="
margin-top:28px;
">

<h2 style="
font-size:16px;
margin:0 0 10px;
">

Message

</h2>

<div style="
padding:18px;
background:#f7f7f7;
border:1px solid #e5e5e5;
border-radius:8px;
line-height:1.7;
font-size:14px;
">

{$safeMessage}

</div>

</div>

<p style="
margin-top:30px;
color:#777777;
font-size:11px;
">

Submitted through the
M3 Hive website contact form.

</p>

</div>

</div>

</body>
</html>
HTML;

/*
|--------------------------------------------------------------------------
| RESEND PAYLOAD
|--------------------------------------------------------------------------
*/

$resendPayload =
    json_encode([
        'from' =>
            $FROM_EMAIL,

        'to' => [
            $CONTACT_EMAIL
        ],

        'reply_to' =>
            $email,

        'subject' =>
            $subject,

        'html' =>
            $emailHtml
    ]);

/*
|--------------------------------------------------------------------------
| SEND THROUGH RESEND
|--------------------------------------------------------------------------
*/

$resendCurl =
    curl_init(
        'https://api.resend.com/emails'
    );

curl_setopt_array(
    $resendCurl,
    [
        CURLOPT_POST =>
            true,

        CURLOPT_POSTFIELDS =>
            $resendPayload,

        CURLOPT_RETURNTRANSFER =>
            true,

        CURLOPT_TIMEOUT =>
            20,

        CURLOPT_HTTPHEADER => [

            'Authorization: Bearer ' .
            $resendApiKey,

            'Content-Type: application/json'
        ]
    ]
);

$resendResponse =
    curl_exec($resendCurl);

$resendHttpCode =
    curl_getinfo(
        $resendCurl,
        CURLINFO_HTTP_CODE
    );

$resendError =
    curl_error($resendCurl);

curl_close($resendCurl);

/*
|--------------------------------------------------------------------------
| RESEND CONNECTION ERROR
|--------------------------------------------------------------------------
*/

if ($resendResponse === false) {

    error_log(
        'Resend request failed: ' .
        $resendError
    );

    respond(500, [
        'success' => false,

        'message' =>
            'Unable to send your message. Please try again.'
    ]);
}

/*
|--------------------------------------------------------------------------
| RESEND API RESULT
|--------------------------------------------------------------------------
*/

$resendResult =
    json_decode(
        $resendResponse,
        true
    );

if (
    $resendHttpCode < 200 ||
    $resendHttpCode >= 300
) {

    error_log(
        'Resend API error: ' .
        $resendResponse
    );

    respond(500, [
        'success' => false,

        'message' =>
            'Unable to send your message. Please try again.'
    ]);
}

/*
|--------------------------------------------------------------------------
| SUCCESS
|--------------------------------------------------------------------------
*/

respond(200, [
    'success' => true,

    'message' =>
        'Thank you! Your message has been sent successfully. Our team will get back to you shortly.'
]);