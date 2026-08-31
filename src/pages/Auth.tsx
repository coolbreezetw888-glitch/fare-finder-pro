import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/pageMeta";

type Props = { mode: "signin" | "signup" };

export default function AuthPage({ mode }: Props) {
  usePageMeta({
    title: "Sign in — Flight Price Notifier",
    description: "登入或註冊 Flight Price Notifier，開始追蹤台北出發的機票降價通知。",
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/app", { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (data.session) {
          navigate("/app", { replace: true });
        } else {
          toast.success("請到信箱點擊確認連結 / Check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/app", { replace: true });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-hero-glow flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Flight Price Notifier
        </Link>
        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          <h1 className="text-xl font-semibold tracking-tight">
            {mode === "signin" ? "登入 / Sign in" : "註冊 / Create account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            用 email 建立帳號，接收機票降價通知。
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "請稍候…" : mode === "signin" ? "Sign in / 登入" : "Sign up / 註冊"}
            </Button>
          </form>

          <Link
            to={mode === "signin" ? "/sign-up" : "/sign-in"}
            className="mt-4 block w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "還沒有帳號？註冊" : "已經有帳號？登入"}
          </Link>
        </div>
      </div>
    </div>
  );
}
