import React from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <PageShell title="Page Not Found">
      <Container size="lg" className="py-24 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-hive-warm-white text-hive-orange mb-6 text-3xl font-heading font-bold">
          404
        </div>
        <h1 className="text-4xl font-heading font-bold text-hive-black mb-4">
          Page Not Found
        </h1>
        <p className="text-neutral-600 max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          Back to Homepage
        </Button>
      </Container>
    </PageShell>
  );
};
