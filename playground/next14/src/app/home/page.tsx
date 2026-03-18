const detailPanels = [
  { label: 'Route file', value: 'src/app/home/page.tsx' },
  { label: 'Trigger', value: 'Back link and supporting cards' },
  { label: 'Use case', value: 'Compare page-level and nested ownership' },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_24%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center px-6 py-10 sm:px-10">
        <section className="w-full rounded-[32px] border border-white/10 bg-slate-950/72 p-7 shadow-[0_24px_90px_rgba(2,6,23,0.42)] backdrop-blur-xl sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100">
              Detail route
            </span>
            <span className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
              App Router
            </span>
          </div>

          <h1 className="mt-6 max-w-[10ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-slate-50 sm:text-6xl">
            Use a second route to test ownership changes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            This page exists to give the demo a second inspection context. Jump between the landing surface and
            this detail view, then compare how the current node and parent chain behave.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {detailPanels.map(item => (
              <article
                key={item.label}
                className="rounded-[24px] border border-white/10 bg-slate-900/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</p>
                <p className="mt-3 font-mono text-sm font-semibold text-slate-100">{item.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-900/72 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">Inspection note</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Try inspecting the title, this note, and the navigation link below. The goal is to keep the route
              simple while still giving react-find meaningful DOM to work with.
            </p>
          </div>

          <a
            href="/"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-sky-500 px-5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-400"
          >
            Back to main page
          </a>
        </section>
      </div>
    </div>
  );
}
