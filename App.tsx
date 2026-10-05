import { useEffect, useRef, useState } from "react";

type Panel = {
  number: string;
  label: string;
  title: string;
  description: string;
  linkLabel: string;
  link: string;
  accent: string;
};

// Edit the text, links, and accent colors below to customize the four panels.
const panels: Panel[] = [
  {
    number: "01",
    label: "Discover",
    title: "Start with an idea",
    description:
      "Explore what’s possible and find the right direction for your next project.",
    linkLabel: "Learn more",
    link: "#discover",
    accent: "#e56f4a",
  },
  {
    number: "02",
    label: "Create",
    title: "Make it your own",
    description:
      "Shape your idea with thoughtful details, clear goals, and a plan that fits.",
    linkLabel: "See our process",
    link: "#create",
    accent: "#da9b3c",
  },
  {
    number: "03",
    label: "Connect",
    title: "Bring people together",
    description:
      "Share your work, start conversations, and build a community around it.",
    linkLabel: "Meet the community",
    link: "#connect",
    accent: "#4d8a73",
  },
  {
    number: "04",
    label: "Grow",
    title: "Take the next step",
    description:
      "Turn momentum into meaningful progress with tools that help you move forward.",
    linkLabel: "Get started",
    link: "#grow",
    accent: "#5d6f9e",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path
        d="M3.75 9h10.5m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + panels.length) % panels.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % panels.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activePanel = panels[activeIndex];

  return (
    <main className="min-h-screen bg-[#f2eee6] p-3 text-[#1d2a24] sm:p-6 lg:p-8">
      <section
        aria-label="Information carousel"
        aria-roledescription="carousel"
        className="relative mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1500px] flex-col overflow-hidden rounded-[24px] bg-[#173c31] shadow-[0_24px_80px_rgba(25,38,31,0.16)] sm:min-h-[calc(100vh-3rem)] sm:rounded-[32px] lg:min-h-[calc(100vh-4rem)]"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 45) {
            goTo(activeIndex + (distance < 0 ? 1 : -1));
          }
          touchStart.current = null;
        }}
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        tabIndex={0}
      >
        <div className="pointer-events-none absolute -right-28 -top-36 h-[440px] w-[440px] rounded-full border border-white/10 sm:h-[600px] sm:w-[600px]" />
        <div className="pointer-events-none absolute -right-10 -top-20 h-[300px] w-[300px] rounded-full border border-white/10 sm:h-[430px] sm:w-[430px]" />

        <header className="relative z-10 flex items-center justify-between px-6 py-6 text-[#fbf8f1] sm:px-10 sm:py-8 lg:px-14">
          <a
            className="text-[13px] font-semibold tracking-[0.24em] uppercase"
            href="#top"
          >
            Your Studio
          </a>
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-white/60 uppercase">
            <span>Stories</span>
            <span className="h-px w-8 bg-white/30" />
            <span>{panels.length} parts</span>
          </div>
        </header>

        <div className="relative z-10 grid flex-1 items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.42fr)]">
          <div className="flex min-h-[470px] flex-col justify-between px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-16 lg:min-h-0 lg:px-14 lg:pb-14 lg:pt-20">
            <div
              aria-atomic="true"
              aria-live="polite"
              className="max-w-4xl"
              key={activeIndex}
            >
              <div className="panel-enter mb-6 flex items-center gap-4 sm:mb-8">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: activePanel.accent }}
                />
                <p className="text-xs font-semibold tracking-[0.22em] text-white/65 uppercase">
                  {activePanel.label}
                </p>
              </div>

              <h1 className="panel-enter panel-enter-delay max-w-[900px] text-[clamp(3.25rem,8vw,7.8rem)] leading-[0.9] font-medium tracking-[-0.055em] text-[#fbf8f1]">
                {activePanel.title}
              </h1>

              <div className="panel-enter panel-enter-delay-2 mt-8 flex max-w-2xl flex-col gap-7 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                  {activePanel.description}
                </p>
                <a
                  className="group flex w-fit shrink-0 items-center gap-3 border-b border-white/35 pb-2 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  href={activePanel.link}
                >
                  {activePanel.linkLabel}
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon direction="right" />
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-12 flex items-end justify-between gap-6">
              <div
                aria-label={`Slide ${activeIndex + 1} of ${panels.length}`}
                className="flex gap-2"
                role="tablist"
              >
                {panels.map((panel, index) => (
                  <button
                    aria-label={`Show panel ${index + 1}: ${panel.title}`}
                    aria-selected={activeIndex === index}
                    className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      activeIndex === index
                        ? "w-10 bg-white"
                        : "w-4 bg-white/25 hover:bg-white/50"
                    }`}
                    key={panel.number}
                    onClick={() => goTo(index)}
                    role="tab"
                    type="button"
                  />
                ))}
              </div>

              <p className="font-serif text-4xl leading-none text-white/25 sm:text-5xl">
                {activePanel.number}
              </p>
            </div>
          </div>

          <nav
            aria-label="Carousel panels"
            className="grid min-h-[300px] grid-cols-2 border-t border-white/10 lg:min-h-0 lg:grid-cols-1 lg:border-l lg:border-t-0"
          >
            {panels.map((panel, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative overflow-hidden border-white/10 px-5 py-5 text-left transition-colors focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white sm:px-7 lg:border-t lg:px-9 ${
                    index % 2 === 0 ? "border-r lg:border-r-0" : ""
                  } ${index > 1 ? "border-t" : ""} ${
                    isActive
                      ? "bg-[#fbf8f1] text-[#173c31]"
                      : "text-white hover:bg-white/[0.06]"
                  }`}
                  key={panel.number}
                  onClick={() => goTo(index)}
                  type="button"
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-1 transition-transform duration-300 lg:inset-x-0 lg:bottom-auto lg:h-1 lg:w-auto ${
                      isActive
                        ? "translate-x-0 lg:translate-y-0"
                        : "-translate-x-full lg:-translate-y-full lg:translate-x-0"
                    }`}
                    style={{ backgroundColor: panel.accent }}
                  />
                  <span className="mb-3 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${
                        isActive ? "text-[#173c31]/55" : "text-white/40"
                      }`}
                    >
                      {panel.label}
                    </span>
                    <span
                      className={`text-xs ${
                        isActive ? "text-[#173c31]/40" : "text-white/30"
                      }`}
                    >
                      {panel.number}
                    </span>
                  </span>
                  <span className="block max-w-[240px] text-lg leading-tight font-medium sm:text-xl">
                    {panel.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-[318px] right-5 z-20 hidden gap-2 lg:bottom-6 lg:right-[calc(42%+1.5rem)] lg:flex">
          <button
            aria-label="Previous panel"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-[#173c31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => goTo(activeIndex - 1)}
            type="button"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            aria-label="Next panel"
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#173c31] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => goTo(activeIndex + 1)}
            type="button"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </section>
    </main>
  );
}
