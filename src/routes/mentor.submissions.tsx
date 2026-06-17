import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SUBMISSIONS, getChallenge } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/mentor/submissions")({
  head: () => ({ meta: [{ title: "Submissions — SkillSwap" }, { name: "description", content: "Review learner submissions and AI evaluations." }] }),
  component: () => (
    <AppLayout breadcrumb={<>Mentor <span className="mx-2">/</span><span className="text-foreground font-medium">Submissions</span></>}>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <div className="label-mono mb-2">Review queue</div>
          <h1 className="text-2xl font-bold tracking-tight">Learner Submissions</h1>
        </div>
        <div className="space-y-4">
          {SUBMISSIONS.map((s) => {
            const c = getChallenge(s.challengeId);
            return (
              <div key={s.id} className="border rounded-lg p-5 bg-surface">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-medium">{s.learnerName} · {c?.title}</div>
                    <div className="text-xs text-muted-foreground">{s.submittedAt}</div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">{s.status}</Badge>
                </div>
                <div className="rounded-md bg-muted p-4 text-sm">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="size-3" /> AI Feedback · Score {s.score}/100
                  </div>
                  {s.feedback}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm">Verify</Button>
                  <Button size="sm" variant="outline">Request revision</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  ),
});
