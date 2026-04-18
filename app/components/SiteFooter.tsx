const MYCRM_UI_NPM_ORG_URL = "https://www.npmjs.com/org/mycrm-ui";

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
        <p className="text-center text-xs md:text-right">
          <a
            href={MYCRM_UI_NPM_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-on-surface-variant transition-colors hover:text-primary"
          >
            <span
              className="material-symbols-outlined text-[14px] text-primary"
              aria-hidden
            >
              deployed_code
            </span>
            <span className="font-medium">npm</span>
            <span className="font-mono">@mycrm-ui</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
