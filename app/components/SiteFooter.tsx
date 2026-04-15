const PACKAGE_VERSIONS = [
  {
    name: "@mycrm-ui/core",
    version: "0.1.2",
    npmUrl: "https://www.npmjs.com/package/@mycrm-ui/core",
  },
  {
    name: "@mycrm-ui/react",
    version: "0.1.2",
    npmUrl: "https://www.npmjs.com/package/@mycrm-ui/react",
  },
  {
    name: "@mycrm-ui/react-table",
    version: "0.1.405",
    npmUrl: "https://www.npmjs.com/package/@mycrm-ui/react-table",
  },
] as const;

export default function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={[
        "w-full border-t border-outline-variant/15 bg-surface-container-lowest text-sm text-on-surface-variant",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto flex max-w-8xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
          <span className="text-lg font-bold text-on-surface">mycrm</span>
          <p>© 2026 mycrm UI. 건축적인 웹을 위해 설계되었습니다.</p>
        </div>
        <details className="w-full md:max-w-[420px]">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-low px-4 py-2 text-xs font-medium text-on-surface transition-colors hover:border-primary/30 hover:text-primary md:justify-between">
            <span className="inline-flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[15px] text-primary"
                aria-hidden
              >
                deployed_code
              </span>
              패키지 npm / 버전 안내
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-on-surface-variant"
              aria-hidden
            >
              expand_more
            </span>
          </summary>
          <div className="mt-2 grid gap-2">
            {PACKAGE_VERSIONS.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-2 md:justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-on-surface">
                    {pkg.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={pkg.npmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-on-surface-variant transition-colors hover:text-primary"
                  >
                    npm
                  </a>
                  <span className="rounded-full bg-surface px-2 py-0.5 font-mono text-[11px] text-on-surface">
                    v{pkg.version}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </footer>
  );
}
