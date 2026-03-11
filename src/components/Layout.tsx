import SiteHeader from "./SiteHeader";
import SiteHeaderMinimal from "./SiteHeaderMinimal";
import SiteFooter from "./SiteFooter";

interface LayoutProps {
  children: React.ReactNode;
  headerVariant?: "full" | "minimal";
  hideFooter?: boolean;
}

export function Layout({ children, headerVariant = "minimal", hideFooter }: LayoutProps) {
  return (
    <>
      {headerVariant === "full" ? <SiteHeader /> : <SiteHeaderMinimal />}
      <main>{children}</main>
      {!hideFooter && <SiteFooter />}
    </>
  );
}
