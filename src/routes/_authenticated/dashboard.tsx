import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlaneTakeoff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "你的機票降價通知後台 / Your flight price alert dashboard." },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      { property: "og:description", content: "Your flight price alert dashboard." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
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
        <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>

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
