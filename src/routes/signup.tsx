import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { signIn } from "@/lib/auth-store";
import type { Role } from "@/lib/mock-data";
import { Cpu, GitBranch, Sparkles, Building2, Sun, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const searchSchema = z.object({
  role: z.enum(["learner", "mentor", "company"]).optional(),
});

export const Route = createFileRoute("/signup")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign up — SkillSwap" },
      { name: "description", content: "Create a learner, mentor, or company account on SkillSwap." },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const search = useSearch({ from: "/signup" });
  const initial: Role = (search.role as Role) ?? "learner";
  const [role, setRole] = useState<Role>(initial);

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
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? Sign in
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 grid place-items-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="label-mono mb-2">Create account</div>
          <h1 className="text-3xl font-bold tracking-tight mb-8">Join SkillSwap</h1>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)} className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6 h-auto p-1">
              <TabsTrigger value="learner" className="flex flex-col gap-1 py-2.5">
                <GitBranch className="size-4" />
                <span>Learner</span>
              </TabsTrigger>
              <TabsTrigger value="mentor" className="flex flex-col gap-1 py-2.5">
                <Sparkles className="size-4" />
                <span>Mentor</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex flex-col gap-1 py-2.5">
                <Building2 className="size-4" />
                <span>Company</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learner">
              <LearnerForm />
            </TabsContent>
            <TabsContent value="mentor">
              <MentorForm />
            </TabsContent>
            <TabsContent value="company">
              <CompanyForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function FormShell({
  children,
  onSubmit,
  cta,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cta: string;
}) {
  return (
    <form onSubmit={onSubmit} className="border rounded-lg p-6 bg-surface space-y-5">
      {children}
      <Button type="submit" className="w-full">{cta}</Button>
      <p className="text-[11px] text-muted-foreground text-center">
        Prototype: no real authentication. Submitting starts a local session.
      </p>
    </form>
  );
}

function LearnerForm() {
  const navigate = useNavigate();
  return (
    <FormShell
      cta="Create learner account"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        signIn({
          role: "learner",
          name: String(data.get("name") || "Alex Rivera"),
          email: String(data.get("email") || "alex@example.com"),
        });
        navigate({ to: "/learner" });
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field id="name" label="Full name" defaultValue="Alex Rivera" />
        <Field id="email" label="Email" type="email" defaultValue="alex@example.com" />
      </div>
      <Field id="skills" label="Skills (comma-separated)" defaultValue="Go, Postgres, Distributed Systems" />
      <div className="grid md:grid-cols-2 gap-4">
        <Field id="level" label="Experience level" defaultValue="Mid-level" />
        <Field id="goal" label="Career goal" defaultValue="Senior backend role" />
      </div>
      <Field id="github" label="GitHub URL" placeholder="https://github.com/yourname" />
      <Field id="linkedin" label="LinkedIn URL" placeholder="https://linkedin.com/in/yourname" />
    </FormShell>
  );
}

function MentorForm() {
  const navigate = useNavigate();
  return (
    <FormShell
      cta="Create mentor account"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        signIn({
          role: "mentor",
          name: String(data.get("name") || "Priya Raman"),
          email: String(data.get("email") || "priya@example.com"),
        });
        navigate({ to: "/mentor" });
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field id="name" label="Full name" defaultValue="Priya Raman" />
        <Field id="email" label="Email" type="email" defaultValue="priya@example.com" />
      </div>
      <Field id="org" label="Current / past organization" defaultValue="Ex-Confluent" />
      <Field id="expertise" label="Areas of expertise" defaultValue="Distributed Systems, Go, Kafka" />
      <div>
        <Label htmlFor="bio" className="mb-1.5 block text-sm">Mentor bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue="10+ years in distributed systems. I write challenges that mirror the work I actually do at scale."
        />
      </div>
    </FormShell>
  );
}

function CompanyForm() {
  const navigate = useNavigate();
  return (
    <FormShell
      cta="Create company account"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        signIn({
          role: "company",
          name: String(data.get("company") || "Stripe"),
          email: String(data.get("email") || "hiring@example.com"),
        });
        navigate({ to: "/company" });
      }}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Field id="company" label="Company name" defaultValue="Stripe" />
        <Field id="email" label="Work email" type="email" defaultValue="hiring@example.com" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field id="size" label="Company size" defaultValue="500–5,000" />
        <Field id="industry" label="Industry" defaultValue="Fintech" />
      </div>
      <Field id="hiring" label="Roles you're hiring for" defaultValue="Backend, Infra, Security" />
    </FormShell>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-sm">{label}</Label>
      <Input id={id} name={id} type={type} defaultValue={defaultValue} placeholder={placeholder} />
    </div>
  );
}
