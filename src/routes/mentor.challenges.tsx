import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CHALLENGES } from "@/lib/mock-data";
import { Plus, Sparkles } from "lucide-react";

export const Route = createFileRoute("/mentor/challenges")({
  head: () => ({ meta: [{ title: "My Challenges — SkillSwap" }, { name: "description", content: "Manage your published challenges." }] }),
  component: () => (
    <AppLayout breadcrumb={<>Mentor <span className="mx-2">/</span><span className="text-foreground font-medium">Challenges</span></>}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="label-mono mb-2">Manage</div>
            <h1 className="text-2xl font-bold tracking-tight">My Challenges</h1>
          </div>
          <Button asChild><Link to="/mentor/challenges/new"><Sparkles className="size-4" /> New challenge</Link></Button>
        </div>
        <div className="border rounded-lg bg-surface overflow-hidden">
          {CHALLENGES.slice(0, 5).map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4 border-b last:border-0">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.category} · {c.difficulty}</div>
              </div>
              <Badge variant="outline" className="font-mono text-[10px]">{c.completedCount} learners</Badge>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  ),
});
