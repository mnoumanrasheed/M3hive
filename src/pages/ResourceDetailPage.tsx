import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { resourcesData } from '../data/resources';
import { Button } from '../components/ui/Button';
import { ArrowLeft, BookOpen, Briefcase, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { FadeIn } from '../components/ui/FadeIn';
import { ArticleContent, CaseStudyContent } from '../types/content';

const typeConfig = {
  article: {
    icon: BookOpen,
    label: 'Article',
    color: 'text-hive-black bg-hive-yellow/20',
  },
  'case-study': {
    icon: Briefcase,
    label: 'Case Study',
    color: 'text-hive-orange bg-hive-orange/10',
  },
  resource: {
    icon: FileText,
    label: 'Resource',
    color: 'text-neutral-600 bg-hive-gray',
  },
};

export const ResourceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find the exact resource by matching its internalPath to the current route
  const resource = useMemo(() => {
    return resourcesData.find((r) => r.internalPath === `/resources/${slug}`);
  }, [slug]);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  const { title, displayTitle, type, publishDate, officialDate, category, content, sourceName, externalUrl } = resource;
  const config = typeConfig[type] ?? typeConfig['resource'];
  const Icon = config.icon;

  const visibleTitle = displayTitle ?? title;
  const visibleDate = officialDate !== undefined ? officialDate : publishDate;

  return (
    <PageShell title={visibleTitle}>
      <div className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-hive-warm-white border-b border-hive-border min-h-[60vh] flex flex-col justify-center">
        <Container size="md">
          <FadeIn>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-hive-text-muted hover:text-hive-black transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>

            {/* Type badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={[
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider',
                  config.color,
                ].join(' ')}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {config.label}
              </span>
              {category && (
                <span className="text-sm font-medium text-hive-text-muted">{category}</span>
              )}
            </div>

            <h1 className="text-display-md font-bold font-heading text-hive-black mb-8 leading-tight">
              {visibleTitle}
            </h1>

            {visibleDate && (
              <p className="text-sm text-hive-text-muted font-medium mb-12">
                Published {visibleDate}
              </p>
            )}

            {/* Content rendering based on type */}
            <div className="prose prose-lg prose-neutral max-w-none text-hive-text mb-16">
              {content?.type === 'article' && (
                <>
                  <p className="text-xl leading-relaxed text-hive-black font-medium mb-8">
                    {(content.data as ArticleContent).introduction}
                  </p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Key Challenges & Context</h2>
                  <p>{(content.data as ArticleContent).keyChallenges}</p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Main Insights</h2>
                  <p>{(content.data as ArticleContent).mainInsights}</p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Practical Implications</h2>
                  <p>{(content.data as ArticleContent).practicalImplications}</p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Conclusion</h2>
                  <p>{(content.data as ArticleContent).conclusion}</p>
                </>
              )}

              {content?.type === 'case-study' && (
                <>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">The Challenge</h2>
                  <p className="text-lg leading-relaxed">
                    {(content.data as CaseStudyContent).challenge}
                  </p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Our Approach</h2>
                  <p>{(content.data as CaseStudyContent).approach}</p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">The Solution</h2>
                  <p>{(content.data as CaseStudyContent).solution}</p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Key Outcomes</h2>
                  <p>{(content.data as CaseStudyContent).outcomes}</p>
                  <h2 className="text-2xl font-heading font-bold text-hive-black mt-10 mb-4">Key Takeaway</h2>
                  <div className="bg-hive-yellow/10 p-6 rounded-2xl mt-4 border border-hive-yellow/20">
                    <p className="m-0 font-medium text-hive-black">{(content.data as CaseStudyContent).keyTakeaway}</p>
                  </div>
                </>
              )}
            </div>

            {/* Source attribution and external link */}
            <div className="pt-8 border-t border-hive-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
              {sourceName && (
                <p className="text-sm font-medium text-hive-text-muted m-0">
                  Source reference: <span className="text-hive-black">{sourceName}</span>
                </p>
              )}
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-hive-orange hover:text-hive-black transition-colors"
                >
                  View original source
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <div className="pt-8 flex justify-start">
              <Button href="/resources" variant="primary" size="lg">
                View All Resources
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </div>
          </FadeIn>
        </Container>
      </div>
    </PageShell>
  );
};

