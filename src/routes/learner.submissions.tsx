import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SUBMISSIONS, getChallenge } from "@/lib/mock-data";
import { Sparkles, GitBranch } from "lucide-react";

export const Route = createFileRoute("/learner/submissions")({
  head: () => ({
    meta: [
      { title: "My Submissions — SkillSwap" },
      { name: "description", content: "Track AI feedback and verification status on your challenge submissions." },
    ],
  }),
  component: Submissions,
});

function Submissions() {
  return (
    <AppLayout
      breadcrumb={
        <>
          Learner <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Submissions</span>
        </>
      }
    >
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <div className="label-mono mb-2">Evidence trail</div>
          <h1 className="text-2xl font-bold tracking-tight">My Submissions</h1>
        </div>

        <div className="space-y-4">
          {SUBMISSIONS.map((s) => {
            const c = getChallenge(s.challengeId);
            return (
              <div key={s.id} className="border rounded-lg p-5 bg-surface">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {c?.category}
                    </div>
                    <h2 className="font-semibold mt-1">
                      <Link to="/learner/challenges/$id" params={{ id: s.challengeId }} className="hover:underline">
                        {c?.title}
                      </Link>
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        s.status === "Verified"
                          ? "bg-success/10 text-success-foreground border-success/30 font-mono text-[10px]"
                          : "font-mono text-[10px]"
                      }
                    >
                      {s.status}
                    </Badge>
                    <div className="text-right">
                      <div className="text-xl font-bold tabular-nums">{s.score}<span className="text-sm text-muted-foreground">/100</span></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                  <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="size-3" /> AI Feedback
                  </div>
                  {s.feedback}
                </div>

                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                  <span>{s.submittedAt}</span>
                  {s.githubUrl && (
                    <Button asChild variant="ghost" size="sm">
                      <a href={s.githubUrl} target="_blank" rel="noreferrer">
                        <GitBranch className="size-3.5" /> View repo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
