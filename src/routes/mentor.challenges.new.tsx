import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mentor/challenges/new")({
  head: () => ({
    meta: [
      { title: "Create Challenge with AI — SkillSwap" },
      { name: "description", content: "AI-assisted challenge authoring: draft, rubric, deliverables. Mentor reviews and publishes." },
    ],
  }),
  component: NewChallenge,
});

function NewChallenge() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AppLayout breadcrumb={<>Mentor <span className="mx-2">/</span><span className="text-foreground font-medium">Create with AI</span></>}>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
        <div>
          <div className="label-mono mb-2">Authoring</div>
          <h1 className="text-2xl font-bold tracking-tight">AI Challenge Assistant</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Describe the skill and learning goal. The assistant drafts a brief, deliverables, and rubric — you review, edit, and publish.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: prompt */}
          <div className="border rounded-lg p-6 bg-surface space-y-5">
            <div className="label-mono">Inputs</div>
            <div>
              <Label htmlFor="skill" className="mb-1.5 block text-sm">Skill</Label>
              <Input id="skill" defaultValue="Distributed transactions in Postgres" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty" className="mb-1.5 block text-sm">Difficulty</Label>
                <Input id="difficulty" defaultValue="Advanced" />
              </div>
              <div>
                <Label htmlFor="price" className="mb-1.5 block text-sm">Price (USD)</Label>
                <Input id="price" type="number" defaultValue="8" />
              </div>
            </div>
            <div>
              <Label htmlFor="goal" className="mb-1.5 block text-sm">Learning goal</Label>
              <Textarea id="goal" rows={3} defaultValue="Learner should ship a service that uses 2PC across two Postgres instances with verified failure-mode handling." />
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setLoading(true);
                setGenerated(false);
                setTimeout(() => {
                  setLoading(false);
                  setGenerated(true);
                }, 900);
              }}
            >
              <Sparkles className="size-4" /> {loading ? "Drafting…" : "Generate draft"}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              AI never publishes on its own — you remain responsible for final content.
            </p>
          </div>

          {/* Right: draft */}
          <div className="border rounded-lg p-6 bg-surface space-y-5">
            <div className="flex items-center justify-between">
              <div className="label-mono">Draft</div>
              {generated && (
                <Badge variant="outline" className="bg-success/10 text-success-foreground border-success/30 font-mono text-[10px]">
                  READY FOR REVIEW
                </Badge>
              )}
            </div>

            {!generated ? (
              <div className="text-sm text-muted-foreground py-10 text-center border-2 border-dashed rounded-md">
                {loading ? "Generating brief, deliverables, and rubric…" : "Your AI-drafted challenge will appear here."}
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Title</div>
                  <Input defaultValue="Two-Phase Commit Across Postgres Shards" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Brief</div>
                  <Textarea
                    rows={4}
                    defaultValue="Ship a Go service coordinating 2PC across two Postgres instances. Demonstrate correct behavior under coordinator crash mid-prepare and document recovery semantics."
                  />
                </div>
                <DraftList title="Deliverables" items={[
                  "GitHub repo with end-to-end runnable demo",
                  "Failure-mode runbook (Markdown)",
                  "Benchmark of commit throughput vs single-node baseline",
                ]} />
                <DraftList title="Evaluation Rubric" items={[
                  "Correctness under coordinator crash (35%)",
                  "Recovery semantics documentation (25%)",
                  "Code clarity and tests (25%)",
                  "Benchmark methodology (15%)",
                ]} />
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1">Publish challenge</Button>
                  <Button variant="outline">Save draft</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function DraftList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{title}</div>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm">
            <CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
