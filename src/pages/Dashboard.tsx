import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PlaneTakeoff } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/pageMeta";

export default function Dashboard() {
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "你的機票降價通知後台 / Your flight price alert dashboard.",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setUser(data.user);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <PlaneTakeoff className="text-primary" />
            Flight Price Notifier
          </span>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign out / 登出
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="text-2xl font-semibold tracking-tight">歡迎回來 / Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>

        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="font-medium">航線訂閱功能即將上線</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Route subscriptions, target prices and fare alerts are coming in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
