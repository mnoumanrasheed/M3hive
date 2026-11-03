import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { FadeIn } from '../ui/FadeIn';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const EnterpriseMainCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-hive-white py-14 sm:py-20 lg:py-24">
      <Container size="lg">
        <FadeIn>
          <div
            className="
              relative
              isolate
              overflow-hidden
              rounded-[2rem]
              border
              border-hive-border
              bg-hive-white
              p-6
              text-hive-black
              shadow-[0_28px_80px_-28px_rgba(10,10,10,0.16)]
              sm:rounded-[2.5rem]
              sm:p-9
              lg:p-12
              xl:p-14
            "
          >
            {/* Background Ambient Glows */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -top-20
                -left-16
                h-[24rem]
                w-[24rem]
                rounded-full
                bg-hive-yellow/20
                blur-[110px]
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-28
                -right-16
                h-[22rem]
                w-[22rem]
                rounded-full
                bg-hive-orange/10
                blur-[120px]
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(ellipse_75%_110%_at_0%_0%,rgba(253,207,9,0.16),rgba(253,207,9,0)_52%),linear-gradient(115deg,rgba(10,10,10,0.025),rgba(255,255,255,0)_42%)]
              "
            />

            {/* Fine architectural grid */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[linear-gradient(to_right,#0A0A0A0a_1px,transparent_1px),linear-gradient(to_bottom,#0A0A0A08_1px,transparent_1px)]
                bg-[size:56px_56px]
                opacity-30
              "
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-5rem] top-1/2 hidden h-[24rem] w-[24rem] -translate-y-1/2 rounded-full border border-hive-yellow/20 lg:block"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-1rem] top-1/2 hidden h-[15rem] w-[15rem] -translate-y-1/2 rounded-full border border-hive-border lg:block"
            />

            <div className="relative z-10 flex justify-center lg:justify-start">
              {/* ============================================================
                  LEFT COLUMN: Value Proposition & CTAs
              ============================================================ */}
              <div className="flex w-full max-w-2xl flex-col text-left">
                {/* Eyebrow */}
                <div className="mb-5 inline-flex items-center gap-2.5 self-start rounded-full border border-hive-yellow/35 bg-hive-yellow/[0.09] px-3.5 py-1.5 backdrop-blur-md sm:mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hive-yellow opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-hive-yellow" />
                  </span>
                  <span className="font-heading text-[10px] font-bold tracking-[0.17em] text-hive-yellow uppercase sm:text-xs">
                    LET'S BUILD WHAT'S NEXT
                  </span>
                </div>

                {/* Heading */}
                <h2 className="mb-4 max-w-2xl font-heading text-3xl font-bold tracking-[-0.045em] text-hive-black sm:mb-6 sm:text-4xl lg:text-5xl lg:leading-[1.06]">
                  Turn your next challenge into{' '}
                  <span className="text-hive-yellow">real momentum.</span>
                </h2>

                {/* Supporting copy */}
                <p className="mb-7 max-w-xl text-sm leading-relaxed text-hive-text-muted sm:mb-8 sm:text-base sm:leading-[1.7]">
                  Tell us what you're trying to build, improve or automate. Our
                  experts will help you identify the right technology approach
                  and a practical way forward.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Primary CTA */}
                  <Link
                    to="/contact-us.html?intent=project"
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-2.5
                      rounded-full
                      border
                      border-hive-yellow
                      bg-hive-yellow
                      px-6
                      py-3.5
                      font-heading
                      text-sm
                      font-bold
                      text-hive-black
                      shadow-[0_12px_30px_rgba(253,207,9,0.22)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-hive-orange
                      hover:bg-hive-orange
                      hover:text-white
                      hover:shadow-hive-orange/30
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-hive-yellow
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-hive-black
                    "
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    to="/contact-us.html?intent=consultation"
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-hive-border
                      bg-hive-white/80
                      px-6
                      py-3.5
                      font-heading
                      text-sm
                      font-semibold
                      text-hive-black
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-hive-yellow/60
                      hover:bg-hive-yellow/10
                      hover:text-hive-yellow
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-hive-yellow
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-hive-white
                    "
                  >
                    <span>Talk to an Expert</span>
                  </Link>
                </div>

                {/* Trust Line */}
                <div className="mt-8 flex items-center gap-3 border-t border-hive-border pt-5 text-xs text-hive-text-muted sm:text-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hive-yellow/25 bg-hive-yellow/10">
                    <ShieldCheck className="h-4 w-4 text-hive-yellow" />
                  </span>
                  <span>No obligation. Just a focused conversation about your goals.</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
};
