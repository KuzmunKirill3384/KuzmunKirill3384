import { PullToRefresh } from "@/components/pull-to-refresh";
import { MobileTabBar } from "@/components/mobile-tab-bar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SupportChatDock } from "@/components/support-chat-dock";
import { NetworkStatusBanner } from "@/components/pwa/network-status-banner";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:border focus:border-[var(--ink)] focus:bg-[var(--paper)] focus:px-4 focus:py-2 focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-[var(--ink)]"
      >
        К содержанию
      </a>
      <NetworkStatusBanner />
      <SiteHeader />
      <main
        id="main-content"
        className="main-with-mobile-nav flex-1 outline-none"
      >
        <PullToRefresh>{children}</PullToRefresh>
      </main>
      <MobileTabBar />
      <ScrollToTop />
      <SupportChatDock />
      <SiteFooter />
    </div>
  );
}
