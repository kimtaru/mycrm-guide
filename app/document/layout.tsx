import Link from "next/link";
import Script from "next/script";
import SideNav from "./side-nav";

function TopNav() {
  return (
    <nav className="fixed top-0 z-50 h-16 w-full bg-surface-container-lowest/80 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-8xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-on-surface">
            mycrm
          </Link>
          <div className="hidden gap-6 md:flex">
            <Link
              href="/document"
              className="border-b-2 border-primary py-5 font-semibold text-primary"
            >
              문서
            </Link>
            <Link
              href="/"
              className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
            >
              컴포넌트
            </Link>
            <Link
              href="/"
              className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
            >
              예시
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              className="w-64 rounded-lg border-none bg-surface-container-low py-1.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="문서 검색..."
              type="search"
              aria-label="문서 검색"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
              search
            </span>
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-on-surface-variant transition-all hover:bg-surface-container-low active:scale-95"
            aria-label="코드"
          >
            <span className="material-symbols-outlined">code</span>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-outline-variant/30" />
      </div>
    </nav>
  );
}

function PageFooter() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-on-surface">mycrm UI</span>
          <p className="text-sm text-on-surface-variant">
            &copy; 2024 mycrm UI. Built for the architectural web.
          </p>
        </div>
        <div className="flex gap-8">
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            GitHub
          </a>
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            NPM
          </a>
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            Discord
          </a>
          <a className="text-sm text-on-surface-variant transition-colors hover:text-primary" href="#">
            Twitter
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
      <TopNav />
      <div className="mx-auto flex max-w-8xl pt-16">
        <SideNav />
        {children}
      </div>
      <PageFooter />
    </>
  );
}
