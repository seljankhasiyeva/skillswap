import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { SectionLabel, StatCard } from "@/components/ui-bits";
import { ChallengeCard } from "@/components/challenge-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CHALLENGES,
  LEARNER_STATS,
  SKILL_PROGRESS,
  BADGES,
  SUBMISSIONS,
  getChallenge,
} from "@/lib/mock-data";
import { ArrowUpRight, GitBranch, CheckCircle2, Eye } from "lucide-react";

export const Route = createFileRoute("/learner/")({
  head: () => ({
    meta: [
      { title: "Learner Dashboard — SkillSwap" },
      { name: "description", content: "Your proof-of-work dashboard: talent score, skill progress, and recommended challenges." },
    ],
  }),
  component: LearnerDashboard,
});

function LearnerDashboard() {
  const recommended = CHALLENGES.slice(0, 3);
  return (
    <AppLayout
      breadcrumb={
        <>
          Learner <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Dashboard</span>
        </>
      }
    >
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Greeting */}
        <div>
          <div className="label-mono mb-2">Overview</div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Alex.</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Three companies viewed your proof-of-work this week.
          </p>
        </div>

        {/* Hero Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Verification Rank"
            value={LEARNER_STATS.rank}
            hint={<span className="text-success">{LEARNER_STATS.rankDelta}</span>}
          />
          <StatCard
            label="Verified Skills"
            value={LEARNER_STATS.verifiedSkills}
            hint={`${LEARNER_STATS.pendingReview} pending review`}
          />
          <StatCard
            label="Proof-of-Work"
            value={LEARNER_STATS.completedChallenges}
            hint="Submissions made"
          />
          <StatCard
            label="Global Standing"
            value={LEARNER_STATS.globalRank}
            hint={`Among ${LEARNER_STATS.totalLearners} learners`}
          />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommended */}
          <section className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <SectionLabel>Recommended Challenges</SectionLabel>
              <Button asChild variant="ghost" size="sm" className="font-mono text-[10px] tracking-wider">
                <Link to="/learner/challenges">VIEW_ALL <ArrowUpRight className="size-3.5" /></Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommended.map((c) => (
                <ChallengeCard key={c.id} c={c} />
              ))}
            </div>

            {/* Recent submissions */}
            <div className="pt-4">
              <SectionLabel>Recent Submissions</SectionLabel>
              <div className="border rounded-lg overflow-hidden bg-surface">
                {SUBMISSIONS.map((s) => {
                  const c = getChallenge(s.challengeId);
                  return (
                    <div key={s.id} className="flex items-center gap-4 p-4 border-b last:border-0">
                      <CheckCircle2
                        className={`size-4 shrink-0 ${
                          s.status === "Verified" ? "text-success" : "text-muted-foreground"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{c?.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {s.submittedAt} · {s.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold tabular-nums">{s.score}/100</div>
                        <div className="font-mono text-[10px] text-muted-foreground tracking-wider">SCORE</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right rail */}
          <aside className="space-y-6">
            <div className="border rounded-lg p-5 bg-surface">
              <SectionLabel>Verified Skill Matrix</SectionLabel>
              <div className="space-y-4">
                {SKILL_PROGRESS.map((s) => (
                  <div key={s.skill}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium">{s.skill}</span>
                      <span className="font-mono text-muted-foreground tabular-nums">{s.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.percent >= 85 ? "bg-success" : "bg-foreground"}`}
                        style={{ width: `${s.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
                  Latest Badges
                </div>
                <div className="space-y-2">
                  {BADGES.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 text-sm">
                      <div
                        className={`size-7 rounded flex items-center justify-center text-[10px] font-bold ${
                          b.tier === "Gold"
                            ? "bg-warning/15 text-warning-foreground"
                            : b.tier === "Silver"
                            ? "bg-muted text-foreground"
                            : "bg-success/15 text-success-foreground"
                        }`}
                      >
                        {b.tier[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{b.name}</div>
                        <div className="text-[11px] text-muted-foreground truncate">{b.earnedFor}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System logs feel */}
            <div className="rounded-lg p-5 bg-primary text-primary-foreground">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary-foreground/60 mb-4">
                System Logs
              </div>
              <ul className="space-y-3 font-mono text-[11px]">
                <li className="flex gap-3">
                  <span className="text-success">[PASS]</span>
                  <span className="opacity-80">14/14 unit tests on “Load Balancer”</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-info">[SYNC]</span>
                  <span className="opacity-80">GitHub commit 8f2a1b validated</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-warning">[VIEW]</span>
                  <span className="opacity-80">Stripe viewed your profile</span>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-2 text-xs">
                <Eye className="size-3.5" />
                <Link to="/learner/profile" className="hover:underline">
                  View public profile
                </Link>
              </div>
            </div>

            <div className="border rounded-lg p-5 bg-surface">
              <SectionLabel>Hiring Activity</SectionLabel>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <GitBranch className="size-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">Stripe</div>
                    <div className="text-[11px] text-muted-foreground">Reviewed your ledger submission</div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">2h</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="size-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">Linear</div>
                    <div className="text-[11px] text-muted-foreground">Shortlisted you</div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">1d</Badge>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
