import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "@/i18n/navigation";
import { useLayoutStore } from "@/store/layoutStore";
import { BREAKPOINTS } from "@/styles/breakpoints";

export const Logo = () => {
  const isSideMenuOpen = useLayoutStore((s) => s.isSideMenuOpen);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);

  const isCollapsed = !isSideMenuOpen && isDesktop;

  return (
    <Link
      href="/dashboard"
      tabIndex={0}
      ref={(el: HTMLAnchorElement | null) => {
        if (el) el.setAttribute("tabindex", "0");
      }}
      aria-label="ELARIS Luxury - dashboard"
      className="flex items-center text-2xl xl:text-xl 1xl:text-[1.3rem] 3xl:text-[1.4rem] font-medium"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elaris-gold/20 flex items-center justify-center text-elaris-gold font-playfair text-sm">
        E
      </div>

      <div
        className={`flex whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        <div className="ml-[0.7rem] xl:ml-[0.55rem] text-elaris-cream mr-px tracking-wider">
          ELARIS
        </div>
      </div>
    </Link>
  );
};
