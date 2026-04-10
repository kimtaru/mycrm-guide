import Script from "next/script";
import DocumentTopNav from "./top-nav";
import SideNav from "./side-nav";

function PageFooter() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto max-w-8xl px-6 py-12">
        <div className="flex flex-col gap-3">
          <span className="font-bold text-on-surface">mycrm UI</span>
          <p className="text-sm text-on-surface-variant">
            &copy; 2026 mycrm UI. Built for the architectural web.
          </p>
          <a
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            href="https://www.npmjs.com/package/@mycrm-ui/react-table"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden>
              deployed_code
            </span>
            npm · @mycrm-ui/react-table
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="scroll-top-on-mount" strategy="afterInteractive">
        {"window.scrollTo({ top: 0, behavior: 'smooth' });"}
      </Script>
      <DocumentTopNav />
      <div className="mx-auto flex max-w-8xl pt-16">
        <SideNav />
        {children}
      </div>
      <PageFooter />
    </>
  );
}
