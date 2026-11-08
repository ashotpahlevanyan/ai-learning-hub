import { useEffect } from 'react';

const SITE = 'AI Learning Hub';
const DEFAULT_DESCRIPTION = "Free, structured study paths for AI certifications and courses: Anthropic Claude, Google, OpenAI, AWS and Microsoft Azure, plus the math and Python behind AI.";

/** Sets the tab title and meta description for the current page. Pass enabled=false to let a nested page set them. */
export function useMeta(title?: string, description?: string, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    document.title = title ? `${title} · ${SITE}` : SITE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description || DEFAULT_DESCRIPTION);
  }, [title, description, enabled]);
}
