import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { StatCard, SectionLabel } from "@/components/ui-bits";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY_STATS, TALENT_POOL, CHALLENGES } from "@/lib/mock-data";
import { ArrowUpRight, Plus } from "lucide-react";

export const Route = createFileRoute("/company/")({
  head: () => ({
    meta: [
      { title: "Company Dashboard — SkillSwap" },
      { name: "description", content: "Hire on evidence. Browse verified talent, open challenges, and your hiring pipeline." },
    ],
  }),
  component: CompanyDashboard,
});

function CompanyDashboard() {
  return (
    <AppLayout breadcrumb={<>Company <span className="mx-2">/</span><span className="text-foreground font-medium">Dashboard</span></>}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="label-mono mb-2">Overview</div>
            <h1 className="text-2xl font-bold tracking-tight">Hire on evidence.</h1>
          </div>
          <Button asChild><Link to="/company/challenges/new"><Plus className="size-4" /> Post a challenge</Link></Button>
        </div>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Verified Talent" value={COMPANY_STATS.verifiedTalent.toLocaleString()} hint="Searchable now" />
          <StatCard label="Open Challenges" value={COMPANY_STATS.openChallenges} />
          <StatCard label="Applications" value={COMPANY_STATS.applications} hint="This month" />
          <StatCard label="Shortlisted" value={COMPANY_STATS.shortlisted} tone="primary" />
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <SectionLabel>Top Verified Talent</SectionLabel>
              <Button asChild variant="ghost" size="sm" className="font-mono text-[10px] tracking-wider">
                <Link to="/company/talent">SEARCH_ALL <ArrowUpRight className="size-3.5" /></Link>
              </Button>
            </div>
            <div className="border rounded-lg bg-surface overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    <th className="px-5 py-3 label-mono">Candidate</th>
                    <th className="px-5 py-3 label-mono hidden md:table-cell">Skills</th>
                    <th className="px-5 py-3 label-mono text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {TALENT_POOL.slice(0, 5).map((t) => (
                    <tr key={t.id} className="border-t hover:bg-muted/40">
                      <td className="px-5 py-3">
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.headline}</div>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {t.verifiedSkills.slice(0, 3).map((s) => (
                            <Badge key={s} variant="outline" className="font-mono text-[10px]">{s}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right font-bold tabular-nums">{t.talentScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside>
            <SectionLabel>Your Open Challenges</SectionLabel>
            <div className="space-y-3">
              {CHALLENGES.filter((c) => c.isCompanyChallenge).map((c) => (
                <div key={c.id} className="border rounded-lg p-4 bg-surface">
                  <div className="font-medium text-sm">{c.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.completedCount} submissions</div>
                  <Badge variant="outline" className="bg-success/10 text-success-foreground border-success/30 font-mono text-[10px] mt-2">Live</Badge>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
