import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TALENT_POOL } from "@/lib/mock-data";

const STAGES = ["Submitted", "AI-Verified", "Shortlisted", "Interview", "Offer"] as const;

export const Route = createFileRoute("/company/pipeline")({
  head: () => ({
    meta: [
      { title: "Hiring Pipeline — SkillSwap" },
      { name: "description", content: "Try Before Hire — move verified candidates through your pipeline." },
    ],
  }),
  component: Pipeline,
});

function Pipeline() {
  const buckets: Record<string, typeof TALENT_POOL> = {
    Submitted: TALENT_POOL.slice(0, 2),
    "AI-Verified": TALENT_POOL.slice(2, 4),
    Shortlisted: TALENT_POOL.slice(4),
    Interview: [],
    Offer: [],
  };
  return (
    <AppLayout breadcrumb={<>Company <span className="mx-2">/</span><span className="text-foreground font-medium">Pipeline</span></>}>
      <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
        <div>
          <div className="label-mono mb-2">Try before hire</div>
          <h1 className="text-2xl font-bold tracking-tight">Hiring Pipeline</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {STAGES.map((stage) => (
            <div key={stage} className="border rounded-lg bg-surface flex flex-col min-h-[400px]">
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{stage}</div>
                <Badge variant="outline" className="font-mono text-[10px]">{buckets[stage].length}</Badge>
              </div>
              <div className="p-3 space-y-2 flex-1">
                {buckets[stage].map((t) => (
                  <div key={t.id} className="border rounded-md p-3 bg-background">
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground">{t.headline}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-[10px] text-muted-foreground">Score {t.talentScore}</span>
                      <Button size="sm" variant="ghost" className="h-6 text-[11px] px-2">Advance →</Button>
                    </div>
                  </div>
                ))}
                {buckets[stage].length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-6">Empty</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
