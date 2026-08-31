import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";

import Landing from "@/pages/Landing";
import AuthPage from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

export default function App() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient]);

  return (
    <ErrorBoundary>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<AuthPage mode="signin" />} />
        <Route path="/sign-up" element={<AuthPage mode="signup" />} />
        {/* Back-compat: the old combined toggle page lived at /auth */}
        <Route path="/auth" element={<AuthPage mode="signin" />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
