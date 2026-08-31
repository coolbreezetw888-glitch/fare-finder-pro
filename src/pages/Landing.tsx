import { Link } from "react-router-dom";
import { BellRing, PlaneTakeoff, XCircle } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/lib/pageMeta";

const features = [
  {
    icon: PlaneTakeoff,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price alert emails",
    body: "低於你設定的目標價，就會 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: XCircle,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒綁約。",
  },
];

export default function Landing() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定台北出發的航線與目標價，機票降價就 email 通知你。Set a route and a target price — we email you when the fare drops.",
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 font-semibold tracking-tight">
            <PlaneTakeoff className="text-primary" />
            Flight Price Notifier
          </span>
          <Button asChild size="sm">
            <Link to="/sign-in">Sign in / 登入</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="bg-hero-glow relative overflow-hidden">
          <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
            <Reveal>
              <span className="inline-flex rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                Taipei departures · 台北出發
              </span>
              <h1 className="text-gradient-brand mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
                Flight Price Notifier
              </h1>
              <p className="mt-6 text-xl font-medium sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                Set a route and a target price — we email you when the fare drops.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <article className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <feature.icon />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold">{feature.title}</h2>
                  <p className="text-sm text-primary">{feature.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flight Price Notifier · 機票降價通知
        </div>
      </footer>
    </div>
  );
}
