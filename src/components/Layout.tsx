import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      {!hideFooter && <SiteFooter />}
    </>
  );
}
