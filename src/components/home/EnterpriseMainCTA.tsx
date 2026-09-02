import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { FadeIn } from '../ui/FadeIn';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Users2,
  Zap,
  BarChart3,
  Cloud,
  Cpu,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const capabilities: CapabilityItem[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    category: 'Intelligence',
    tagline: 'GenAI, Autonomous Agents & Machine Learning',
    icon: Bot,
  },
  {
    id: 'engineering',
    title: 'Product Engineering',
    category: 'Build',
    tagline: 'Full-Cycle Web, Mobile & Enterprise Architecture',
    icon: Code2,
  },
  {
    id: 'cx',
    title: 'Customer Experience',
    category: 'Design',
    tagline: 'Research, User Experience & Interface Systems',
    icon: Users2,
  },
  {
    id: 'automation',
    title: 'Intelligent Automation',
    category: 'Operations',
    tagline: 'End-to-End RPA & Cognitive Process Workflows',
    icon: Zap,
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    category: 'Insights',
    tagline: 'Modern Data Stack, Governance & BI Pipelines',
    icon: BarChart3,
  },
  {
    id: 'cloud',
    title: 'Cloud Platforms',
    category: 'Infrastructure',
    tagline: 'Cloud DevOps, Scalable Systems & Salesforce',
    icon: Cloud,
  },
  {
    id: 'edge',
    title: 'Edge Technologies',
    category: 'Emerging',
    tagline: 'Extended Reality, IoT & Embedded Systems',
    icon: Cpu,
  },
];

export const EnterpriseMainCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-hive-white py-16 sm:py-24 lg:py-32">
      <Container size="lg">
        <FadeIn>
          <div
            className="
              relative
              isolate
              overflow-hidden
              rounded-2xl
              border
              border-hive-border
              bg-[#0A0A0A]
              p-6
              text-white
              shadow-2xl
              sm:rounded-[2rem]
              sm:p-10
              md:p-12
              lg:p-16
            "
          >
            {/* Background Ambient Glows */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -top-32
                -left-32
                h-96
                w-96
                rounded-full
                bg-hive-yellow/15
                blur-3xl
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-32
                -right-32
                h-96
                w-96
                rounded-full
                bg-hive-orange/15
                blur-3xl
              "
            />
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,207,9,0.08),rgba(255,255,255,0))]
              "
            />

            {/* Subtle Enterprise Grid Pattern */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
                bg-[size:40px_40px]
                opacity-40
              "
            />

            <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              {/* ============================================================
                  LEFT COLUMN: Value Proposition & CTAs
              ============================================================ */}
              <div className="flex flex-col text-left lg:col-span-5">
                {/* Eyebrow */}
                <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-hive-yellow/30 bg-hive-yellow/10 px-3.5 py-1.5 backdrop-blur-md sm:mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hive-yellow opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-hive-yellow" />
                  </span>
                  <span className="font-heading text-xs font-semibold tracking-wider text-hive-yellow uppercase">
                    LET'S BUILD WHAT'S NEXT
                  </span>
                </div>

                {/* Heading */}
                <h2 className="mb-4 font-heading text-display-sm font-bold tracking-tight text-white sm:mb-6 sm:text-display-md lg:text-[2.6rem] lg:leading-[1.15]">
                  Have a challenge worth solving?
                </h2>

                {/* Supporting copy */}
                <p className="mb-8 text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed">
                  Tell us what you're trying to build, improve or automate. Our
                  experts will help you identify the right technology approach
                  and a practical way forward.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
                  {/* Primary CTA */}
                  <Link
                    to="/contact-us.html?intent=project"
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-2.5
                      rounded-xl
                      border
                      border-hive-yellow
                      bg-hive-yellow
                      px-6
                      py-3.5
                      font-heading
                      text-sm
                      font-bold
                      text-hive-black
                      shadow-lg
                      shadow-hive-yellow/20
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
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
                      rounded-xl
                      border
                      border-white/20
                      bg-white/[0.04]
                      px-5
                      py-3.5
                      font-heading
                      text-sm
                      font-semibold
                      text-white
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-white/40
                      hover:bg-white/[0.08]
                      hover:text-hive-yellow
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-white/50
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-hive-black
                    "
                  >
                    <span>Talk to an Expert</span>
                  </Link>
                </div>

                {/* Trust Line */}
                <div className="mt-8 flex items-center gap-2.5 border-t border-white/10 pt-5 text-xs text-neutral-400 sm:text-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-hive-yellow" />
                  <span>No obligation. Just a focused conversation about your goals.</span>
                </div>
              </div>

              {/* ============================================================
                  RIGHT COLUMN: Interactive Capability Grid
              ============================================================ */}
              <div className="lg:col-span-7">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Select a core domain to get started
                  </span>
                  <span className="hidden text-xs text-hive-yellow/90 sm:inline-flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Interactive Capabilities
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                  {capabilities.map((item, idx) => {
                    const IconComponent = item.icon;
                    const isLastOdd =
                      idx === capabilities.length - 1 &&
                      capabilities.length % 2 !== 0;

                    return (
                      <Link
                        key={item.id}
                        to={`/contact-us.html?intent=project&service=${encodeURIComponent(
                          item.title
                        )}`}
                        className={`
                          group
                          relative
                          flex
                          flex-col
                          justify-between
                          overflow-hidden
                          rounded-xl
                          border
                          border-white/10
                          bg-white/[0.03]
                          p-4
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-hive-yellow/60
                          hover:bg-white/[0.07]
                          hover:shadow-lg
                          hover:shadow-hive-yellow/5
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-hive-yellow
                          ${isLastOdd ? 'sm:col-span-2' : ''}
                        `}
                      >
                        {/* Hover subtle radial glow */}
                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute
                            top-0
                            right-0
                            h-28
                            w-28
                            -translate-y-1/2
                            translate-x-1/2
                            rounded-full
                            bg-hive-yellow/0
                            blur-2xl
                            transition-all
                            duration-500
                            group-hover:bg-hive-yellow/20
                          "
                        />

                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-white/10
                                bg-white/[0.06]
                                text-hive-yellow
                                transition-colors
                                duration-300
                                group-hover:border-hive-yellow/40
                                group-hover:bg-hive-yellow/15
                                group-hover:text-white
                              "
                            >
                              <IconComponent className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <h3 className="font-heading text-sm font-bold text-white transition-colors duration-300 group-hover:text-hive-yellow sm:text-base">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-neutral-400 sm:text-xs">
                                {item.tagline}
                              </p>
                            </div>
                          </div>

                          <div
                            className="
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/10
                              text-neutral-400
                              transition-all
                              duration-300
                              group-hover:border-hive-yellow/40
                              group-hover:bg-hive-yellow/20
                              group-hover:text-hive-yellow
                            "
                          >
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>

                        {/* Subtle bottom indicator */}
                        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-neutral-400">
                          <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400">
                            0{idx + 1}
                          </span>
                          <span className="font-medium text-hive-orange/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Start Journey →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
};
