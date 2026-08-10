export interface PolicySection {
  title: string;
  content: string[];
}

export interface PolicyData {
  slug: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}

export const riskPolicies: Record<string, PolicyData> = {
  'code-of-conduct': {
    slug: 'code-of-conduct',
    title: 'Code of Conduct',
    intro: "M3 Hive's Code of Conduct defines the ethical and professional standards expected across the organisation and guides interactions with colleagues, clients, suppliers, stakeholders, government entities and competitors.",
    sections: [
      {
        title: 'WHY IT MATTERS',
        content: [
          'The Code acts as a guide for decision-making and workplace conduct and applies across M3 Hive regardless of location or seniority.'
        ]
      },
      {
        title: 'OUR ETHICAL COMPASS',
        content: [
          '1. Ethical Behaviour, Respect and Professionalism: Treat people respectfully, maintain professionalism and use organisational resources responsibly.',
          '2. Integrity, Compliance and Confidentiality: Act honestly, comply with applicable laws and protect confidential and sensitive information.',
          '3. Inclusion, Equality, Diversity and Online Etiquette: Treat people fairly, reject discrimination and use technology responsibly.',
          '4. Environmental Sustainability, Safety and Community Welfare: Promote safe and sustainable practices and report concerns.',
          '5. Rejection of Slavery and Human Trafficking: Oppose modern slavery and promote responsible and transparent supply chains.'
        ]
      },
      {
        title: 'ONE TEAM, ONE CODE',
        content: [
          '**M3 Hiver**\n- understand and follow the Code\n- maintain ethical standards\n- report compliance concerns',
          '**Leadership Team**\n- lead by example\n- make reporting channels clear\n- provide compliance training\n- protect good-faith reporters from retaliation',
          '**Board of Directors**\n- oversee adherence\n- review policies\n- establish investigation processes\n- monitor disciplinary actions'
        ]
      },
      {
        title: 'ETHICAL BUSINESS PRACTICES',
        content: [
          '- honesty',
          '- integrity',
          '- fairness',
          '- respect and dignity',
          '- professional conduct',
          '- open and respectful communication',
          '- responsible use of company resources',
          '- appropriate gifts and hospitality',
          '- prohibition on improper influence'
        ]
      },
      {
        title: 'INTEGRITY, COMPLIANCE AND CONFIDENTIALITY',
        content: [
          '- zero tolerance for bribery and corruption',
          '- anti-money-laundering awareness',
          '- sanctions compliance',
          '- data protection',
          '- confidentiality',
          '- intellectual property protection'
        ]
      }
    ]
  },
  'compliance-policy': {
    slug: 'compliance-policy',
    title: 'Compliance Policy',
    intro: "M3 Hive treats compliance and integrity as core business responsibilities and expects operations to comply with applicable laws, internal policies and the Code of Conduct.",
    sections: [
      {
        title: 'COMPLIANCE PRINCIPLES',
        content: [
          '- compliance with laws and regulations',
          '- adherence to the M3 Hive Code of Conduct',
          '- compliance with internal policies',
          '- integrity and transparency',
          '- responsible business conduct'
        ]
      },
      {
        title: 'ZERO TOLERANCE',
        content: [
          "M3 Hive's zero-tolerance approach to:",
          '- bribery',
          '- corruption',
          '- regulatory violations',
          '- illegal conduct'
        ]
      },
      {
        title: 'MANAGING COMPLIANCE RISK',
        content: [
          'Compliance risk includes failure to comply with:',
          '- laws',
          '- regulations',
          '- Code of Conduct requirements',
          '- internal policies'
        ]
      },
      {
        title: 'RESPONSIBLE CONDUCT',
        content: [
          '- conflicts of interest',
          '- confidentiality',
          '- data protection',
          '- responsible business relationships',
          '- reporting suspected violations'
        ]
      }
    ]
  },
  'dignity-and-respect': {
    slug: 'dignity-and-respect',
    title: 'Dignity and Respect',
    intro: "M3 Hive's Dignity and Respect at Work Policy supports a professional working environment based on mutual respect, equality and appropriate workplace behaviour.",
    sections: [
      {
        title: 'PURPOSE',
        content: [
          'The policy establishes expectations for respectful behaviour and a positive professional environment.'
        ]
      },
      {
        title: 'OUR COMMITMENT',
        content: [
          '- dignity',
          '- mutual respect',
          '- equal opportunity',
          '- inclusion',
          '- professional behaviour',
          '- fair treatment'
        ]
      },
      {
        title: 'UNACCEPTABLE CONDUCT',
        content: [
          '- discrimination',
          '- harassment',
          '- bullying',
          '- intimidation',
          '- offensive behaviour',
          '- victimisation'
        ]
      },
      {
        title: 'WORKPLACE RESPONSIBILITY',
        content: [
          'Everyone contributes to creating and maintaining an inclusive and respectful working environment.'
        ]
      }
    ]
  },
  'diversity-equity-inclusion': {
    slug: 'diversity-equity-inclusion',
    title: 'Diversity, Equity and Inclusion',
    intro: "M3 Hive promotes equal opportunity and working relationships based on mutual respect and valuing diversity.",
    sections: [
      {
        title: 'OUR APPROACH',
        content: [
          '- equal opportunity',
          '- mutual respect',
          '- diversity',
          '- dignity',
          '- inclusion',
          '- fair treatment'
        ]
      },
      {
        title: 'INCLUSIVE WORKPLACE',
        content: [
          'M3 Hive aims to create an environment where people can contribute, develop and progress irrespective of background.'
        ]
      },
      {
        title: 'FAIR OPPORTUNITY',
        content: [
          'Fair access to:',
          '- professional development',
          '- participation',
          '- career growth',
          '- workplace opportunities'
        ]
      },
      {
        title: 'RESPECTING DIFFERENCES',
        content: [
          'Different backgrounds, perspectives and experiences should be valued as part of an inclusive workplace.'
        ]
      }
    ]
  },
  'anti-slavery-human-trafficking': {
    slug: 'anti-slavery-human-trafficking',
    title: 'Anti-Slavery and Anti-Human Trafficking Statement 2024',
    intro: "M3 Hive maintains a zero-tolerance approach to slavery and human trafficking and supports responsible practices throughout its operations and supply chain.",
    sections: [
      {
        title: 'OUR COMMITMENT',
        content: [
          '- zero tolerance for slavery',
          '- zero tolerance for human trafficking',
          '- protection of human rights',
          '- responsible business practices'
        ]
      },
      {
        title: 'MODERN SLAVERY ACT',
        content: [
          'The M3 Hive statement is published in relation to section 54(1) of the UK Modern Slavery Act 2015.'
        ]
      },
      {
        title: 'SUPPLY CHAIN RESPONSIBILITY',
        content: [
          'M3 Hive extends its human-rights commitments to its supply chain and expects responsible standards from business partners and suppliers.'
        ]
      },
      {
        title: 'BUSINESS DECISIONS',
        content: [
          'Human-rights considerations form part of responsible business and supply-chain management.'
        ]
      },
      {
        title: 'TRANSPARENCY',
        content: [
          "M3 Hive's commitment to maintaining transparent and responsible practices intended to reduce modern-slavery and trafficking risks."
        ]
      }
    ]
  }
};
