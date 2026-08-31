import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
};

function setMetaTag(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// Lightweight per-page <title>/description setter. Replaces TanStack Start's
// route-level `head()` config now that rendering is fully client-side.
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    if (description) {
      setMetaTag("description", description);
      setMetaTag("og:title", title, "property");
      setMetaTag("og:description", description, "property");
    }
    return () => {
      document.title = previousTitle;
    };
  }, [title, description]);
}
