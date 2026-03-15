import { useEffect } from "react";

const DEFAULT_TITLE = "BRIDGE PBC — Ghana Investment Intelligence & Sector Analysis";
const DEFAULT_DESC =
  "Institutional-grade investment intelligence across 12 integrated sectors in Ghana. 174+ ventures, sector analysis, policy tracking, and data-driven research for investors, government partners, and development organizations.";

interface PageMeta {
  title?: string;
  description?: string;
}

/**
 * Sets document title and meta description for the current page.
 * Resets to defaults on unmount.
 */
export function usePageMeta({ title, description }: PageMeta = {}) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | BRIDGE PBC` : DEFAULT_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";
    if (metaDesc && description) metaDesc.setAttribute("content", description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute("content", description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", document.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && description) twDesc.setAttribute("content", description);

    return () => {
      document.title = prev;
      if (metaDesc) metaDesc.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
