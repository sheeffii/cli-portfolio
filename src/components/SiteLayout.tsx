import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}

