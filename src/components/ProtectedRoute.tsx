import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";

type Props = { children: ReactNode };

// Client-side replacement for the old `_authenticated` route's beforeLoad
// guard (which already ran client-only via `ssr: false`).
export function ProtectedRoute({ children }: Props) {
  const [state, setState] = useState<{ status: "loading" | "authed" | "anon"; user?: User }>({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data, error }) => {
      if (cancelled) return;
      if (error || !data.user) {
        setState({ status: "anon" });
      } else {
        setState({ status: "authed", user: data.user });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") return null;
  if (state.status === "anon") return <Navigate to="/sign-in" replace />;

  return children;
}
