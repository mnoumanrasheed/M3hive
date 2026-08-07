import React, { useState, useMemo } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FadeIn } from '../components/ui/FadeIn';
import { ResourceCard } from '../components/ui/ResourceCard';
import { resourcesData } from '../data/resources';
import { Search, SlidersHorizontal } from 'lucide-react';
import { HeroBackground } from '../components/ui/HeroBackground';

export const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const parseDate = (dateString: string | null) => {
    if (!dateString) return new Date(0).getTime();
    return new Date(dateString).getTime();
  };

  const filteredAndSortedResources = useMemo(() => {
    let result = resourcesData;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.displayTitle?.toLowerCase().includes(q) ||
          r.category?.toLowerCase().includes(q) ||
          r.sourceName?.toLowerCase().includes(q)
      );
    }

    // Sort by date
    result = [...result].sort((a, b) => {
      const timeA = parseDate(a.publishDate);
      const timeB = parseDate(b.publishDate);
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [searchQuery, sortOrder]);

  const articles = filteredAndSortedResources.filter((r) => r.type === 'article');
  const additional = filteredAndSortedResources.filter((r) => r.type !== 'article');

  return (
    <PageShell title="Resources & Insights">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-hive-border z-0">
        <HeroBackground imageUrl="/assets/heroes/hero-resources.jpg" />
        <Container size="md" className="relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hive-yellow/40 bg-hive-yellow/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-hive-yellow" />
              <span className="text-xs font-heading font-bold tracking-widest uppercase text-white drop-shadow">
                Knowledge Hub
              </span>
            </div>
            <h1 className="text-display-lg font-bold font-heading text-white drop-shadow-md mb-6">
              Insights & Resources
            </h1>
            <p className="text-lg text-white/90 drop-shadow leading-relaxed mb-10">
              Perspectives, case studies, and technical resources from our teams.
            </p>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <div className="relative w-full sm:w-2/3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-hive-white border border-hive-border rounded-xl focus:outline-none focus:border-hive-yellow focus:ring-1 focus:ring-hive-yellow shadow-hive-sm transition-all"
                />
              </div>
              <div className="relative w-full sm:w-1/3 flex items-center bg-hive-white border border-hive-border rounded-xl px-4 py-3 shadow-hive-sm group hover:border-hive-yellow transition-all">
                <SlidersHorizontal className="w-5 h-5 text-neutral-400 mr-2 flex-shrink-0" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                  className="w-full bg-transparent text-hive-black focus:outline-none cursor-pointer appearance-none text-sm font-semibold"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ─── ARTICLES ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-white min-h-[40vh]">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="Latest Insights and Articles" 
              description={articles.length === 0 ? "No articles found matching your criteria." : "Explore our perspectives on technology, engineering, and digital transformation."}
              accentBar
            />
          </FadeIn>

          {articles.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((item, idx) => (
                <FadeIn key={item.id} delay={(idx % 6) * 0.05} className="flex">
                  <ResourceCard resource={item} className="h-full w-full" />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ─── ADDITIONAL RESOURCES ─────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-hive-gray border-t border-hive-border min-h-[40vh]">
        <Container size="lg">
          <FadeIn>
            <SectionHeading 
              title="Case Studies & Reports" 
              description={additional.length === 0 ? "No additional resources found matching your criteria." : "Deep dives into how we solve complex challenges for our clients."}
              accentBar
            />
          </FadeIn>

          {additional.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {additional.map((item, idx) => (
                <FadeIn key={item.id} delay={(idx % 8) * 0.05} className="flex">
                  <ResourceCard resource={item} className="h-full w-full bg-hive-white" />
                </FadeIn>
              ))}
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
};
