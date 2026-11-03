import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Button } from '../../components/ui/Button';
import { FadeIn } from '../../components/ui/FadeIn';
import { WorkflowDiagram } from '../../components/products/WorkflowDiagrams';
import { productById, type ProductId } from '../../data/products';

export const ProductPage: React.FC<{ productId: ProductId }> = ({ productId }) => {
  const product = productById(productId)!;

  return (
    <PageShell title={product.name} description={product.overview}>
      <section className="relative flex min-h-[680px] items-center overflow-hidden border-b border-hive-border pt-28 pb-16 sm:min-h-[720px]">
        <img src={product.heroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-[38%] to-white/10" />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <FadeIn className="max-w-2xl"><div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-hive-yellow/60 bg-white/90 px-3.5 py-1.5 shadow-hive-sm backdrop-blur"><span className="h-2 w-2 rounded-full bg-hive-yellow animate-pulse" /><span className="font-heading text-xs font-bold uppercase tracking-wider text-hive-orange">{product.category}</span><span className="text-hive-border">|</span><span className="text-xs font-medium text-hive-text-muted">M3 Hive Product</span></div>
            <h1 className="mt-6 font-heading text-display-xl font-bold text-hive-black">{product.name}</h1>
            <p className="mt-5 text-xl font-semibold tracking-tight text-hive-orange sm:text-2xl">&quot;{product.positioningLine}&quot;</p>
            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-hive-black sm:text-lg">{product.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button href={product.primaryCta.href} size="lg">{product.primaryCta.label}</Button><Button href={product.secondaryCta.href} isExternal={product.secondaryCta.external} variant="outline" size="lg">{product.secondaryCta.label}</Button></div>
          </div></FadeIn>
        </div>
      </section>

      <section className="bg-hive-white py-14 sm:py-20"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <FadeIn><div><WorkflowDiagram productId={productId} /></div></FadeIn>
        <div className="my-10 grid gap-6 lg:grid-cols-2 sm:my-14">
          <FadeIn><div className="h-full rounded-2xl border border-hive-border bg-white p-7 shadow-hive-card sm:p-9"><p className="text-xs font-bold uppercase tracking-widest text-hive-orange">Operational Context</p><h2 className="mt-4 font-heading text-2xl font-bold">Challenge</h2><p className="mt-4 leading-relaxed text-hive-text-muted">{product.challenge}</p></div></FadeIn>
          <FadeIn delay={0.08}><div className="h-full rounded-2xl border border-hive-border bg-white p-7 shadow-hive-card sm:p-9"><p className="text-xs font-bold uppercase tracking-widest text-hive-orange">Platform Architecture</p><h2 className="mt-4 font-heading text-2xl font-bold">Value Proposition</h2><ul className="mt-5 space-y-3">{product.valueProposition.map((value) => <li key={value} className="flex gap-3 text-sm leading-relaxed text-hive-text-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-hive-orange" />{value}</li>)}</ul></div></FadeIn>
        </div>
        <div className="grid gap-6 md:grid-cols-2"><FadeIn><InfoCard eyebrow="Target Stakeholders" title="Potential Users" items={product.intendedUsers} /></FadeIn><FadeIn delay={0.08}><InfoCard eyebrow="Partnership Scope" title="Collaboration Opportunities" items={product.collaborationOpportunities} /></FadeIn></div>
      </div></section>
    </PageShell>
  );
};

const InfoCard: React.FC<{ eyebrow: string; title: string; items: string[] }> = ({ eyebrow, title, items }) => <div className="h-full rounded-2xl border border-hive-border bg-hive-gray/60 p-7 sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-hive-text-muted">{eyebrow}</p><h2 className="mt-3 font-heading text-xl font-bold">{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm text-hive-text-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hive-yellow" />{item}</li>)}</ul></div>;
