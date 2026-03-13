import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter }: LayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      {!hideFooter && <SiteFooter />}
    </>
  );
}
