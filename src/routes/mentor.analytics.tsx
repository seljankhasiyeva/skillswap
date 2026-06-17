import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { StatCard } from "@/components/ui-bits";
import { MENTOR_STATS } from "@/lib/mock-data";

export const Route = createFileRoute("/mentor/analytics")({
  head: () => ({ meta: [{ title: "Analytics — SkillSwap" }, { name: "description", content: "Challenge performance and learner outcomes." }] }),
  component: () => (
    <AppLayout breadcrumb={<>Mentor <span className="mx-2">/</span><span className="text-foreground font-medium">Analytics</span></>}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <div className="label-mono mb-2">Performance</div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        </div>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Learners" value={MENTOR_STATS.totalLearners.toLocaleString()} />
          <StatCard label="Completion Rate" value="68%" hint="+4% MoM" />
          <StatCard label="Avg Score" value="81" />
          <StatCard label="NPS" value="64" hint="Best-in-class" />
        </section>
        <div className="border rounded-lg p-12 bg-surface text-center text-sm text-muted-foreground">
          Detailed time-series charts coming in the next iteration.
        </div>
      </div>
    </AppLayout>
  ),
});
