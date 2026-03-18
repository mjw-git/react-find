const stats = [
  { value: 'App Router', label: 'Route-aware inspection' },
  { value: 'Ctrl / ⌘ + hover', label: 'Highlight the current node' },
  { value: 'Right click', label: 'Inspect parent owners' },
];

const workflow = [
  {
    title: 'Scan the live surface',
    copy: 'Hover hero cards, buttons, and nested detail blocks to verify the current highlight path.',
  },
  {
    title: 'Open the current file',
    copy: 'Click the selected node to jump directly into the source rendered by the App Router page.',
  },
  {
    title: 'Traverse owner ancestry',
    copy: 'Use the context menu when you want to compare the current DOM node with its parent owners.',
  },
];

const hotspots = [
  { path: 'src/app/page.tsx', copy: 'Main landing surface' },
  { path: 'src/app/home/page.tsx', copy: 'Secondary routed detail view' },
  { path: 'components/Profile/index.tsx', copy: 'Client bootstrap for react-find' },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(45,212,191,0.16),transparent_32%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100">
            React Find Demo
          </span>
          <span className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            Next 14
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <section className="rounded-[32px] border border-white/10 bg-slate-950/70 p-7 shadow-[0_24px_90px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:p-9">
            <h1 className="max-w-[12ch] text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-slate-50 sm:text-7xl">
              Inspect routed UI without default-template noise.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              This App Router demo is designed like a product surface instead of a starter page, so you can test
              react-find on layered cards, nested sections, route links, and semantic blocks that look closer to
              a real app.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/home"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-sky-500 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-400"
              >
                Open detail route
              </a>
              <a
                href="https://github.com/mjw-git/react-find"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-slate-900/70 px-5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-sky-400/40"
              >
                View project
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map(item => (
                <article
                  key={item.value}
                  className="rounded-[24px] border border-white/10 bg-slate-900/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <p className="font-mono text-sm font-semibold text-slate-50">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.label}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-slate-950/72 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Route preview</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-50">Two pages, one inspection flow</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Move between the landing page and the detail route to test that react-find remains useful across
                routed App Router surfaces.
              </p>
              <a
                href="/home"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 px-4 text-sm font-semibold text-amber-100 transition hover:-translate-y-0.5 hover:bg-amber-400/14"
              >
                Inspect routed detail view
              </a>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-slate-950/72 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Hotspots</p>
              <div className="mt-5 space-y-3">
                {hotspots.map(item => (
                  <article
                    key={item.path}
                    className="rounded-[20px] border border-white/10 bg-slate-900/70 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <p className="font-mono text-sm font-semibold text-sky-100">{item.path}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.copy}</p>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <article className="rounded-[32px] border border-white/10 bg-slate-950/70 p-7 shadow-[0_24px_90px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Live DOM surface</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-50">Inspect hero cards, buttons, and nested blocks</h2>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">
                page.tsx
              </span>
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-900/72 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <section className="rounded-[22px] border border-white/10 bg-slate-950/72 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Current node</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-50">Hero action card</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Click this surface, inspect the paragraph, or compare it with the action button below.
                  </p>
                  <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-sky-500 px-4 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-400">
                    Trigger inspectable action
                  </button>
                </section>

                <section className="rounded-[22px] border border-white/10 bg-slate-950/72 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Parent path</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
                      <p className="font-mono text-sm font-semibold text-slate-100">section.hero-panel</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
                      <p className="font-mono text-sm font-semibold text-slate-100">main.landing-shell</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </article>

          <article className="rounded-[32px] border border-white/10 bg-slate-950/70 p-7 shadow-[0_24px_90px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Workflow</p>
            <div className="mt-5 space-y-4">
              {workflow.map((item, index) => (
                <article
                  key={item.title}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-[22px] border border-white/10 bg-slate-900/72 px-4 py-4"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/14 font-mono text-sm font-semibold text-sky-100">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-50">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
