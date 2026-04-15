import Script from "next/script";
import SiteFooter from "../components/SiteFooter";
import DocumentTopNav from "./top-nav";
import SideNav from "./side-nav";

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
      <SiteFooter />
    </>
  );
}
