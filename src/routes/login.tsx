import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "@/lib/auth-store";
import type { Role } from "@/lib/mock-data";
import { Cpu, Sun, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SkillSwap" },
      { name: "description", content: "Sign in to your SkillSwap account." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("learner");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 bg-primary rounded-sm flex items-center justify-center">
              <Cpu className="size-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">SkillSwap</span>
          </Link>
          <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground">
            Need an account? Sign up
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 grid place-items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="label-mono mb-2">Sign in</div>
          <h1 className="text-3xl font-bold tracking-tight mb-8">Welcome back</h1>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="mb-5">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="learner">Learner</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
          </Tabs>

          <form
            className="border rounded-lg p-6 bg-surface space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const email = String(data.get("email") || "user@example.com");
              const defaultName =
                role === "company" ? "Stripe" : role === "mentor" ? "Priya Raman" : "Alex Rivera";
              signIn({ role, name: defaultName, email });
              navigate({
                to: role === "company" ? "/company" : role === "mentor" ? "/mentor" : "/learner",
              });
            }}
          >
            <div>
              <Label htmlFor="email" className="mb-1.5 block text-sm">Email</Label>
              <Input id="email" name="email" type="email" defaultValue="alex@example.com" />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1.5 block text-sm">Password</Label>
              <Input id="password" name="password" type="password" defaultValue="prototype" />
            </div>
            <Button type="submit" className="w-full">Sign in as {role}</Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Prototype: no real authentication. Submitting starts a local session.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
