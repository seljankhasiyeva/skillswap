import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BADGES, LEARNER_STATS, SKILL_PROGRESS, SUBMISSIONS, getChallenge } from "@/lib/mock-data";
import { GitBranch, Linkedin, Share2 } from "lucide-react";

export const Route = createFileRoute("/learner/profile")({
  head: () => ({
    meta: [
      { title: "Proof-of-Work Profile — SkillSwap" },
      { name: "description", content: "Your public proof-of-work profile: verified skills, completed challenges, badges, and Talent Score." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <AppLayout
      breadcrumb={
        <>
          Learner <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Proof-of-Work</span>
        </>
      }
    >
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="border rounded-lg p-6 bg-surface flex flex-wrap items-start gap-6">
          <div className="size-20 rounded-full bg-muted grid place-items-center text-2xl font-bold">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Alex Rivera</h1>
              <Badge variant="outline" className="bg-success/10 text-success-foreground border-success/30 font-mono text-[10px]">
                VERIFIED
              </Badge>
            </div>
            <p className="text-muted-foreground">Backend / Distributed Systems</p>
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
              <a href="#" className="flex items-center gap-1 hover:text-foreground">
                <GitBranch className="size-3.5" /> github.com/alexrivera
              </a>
              <a href="#" className="flex items-center gap-1 hover:text-foreground">
                <Linkedin className="size-3.5" /> linkedin.com/in/alexrivera
              </a>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold tabular-nums">{LEARNER_STATS.talentScore.toLocaleString()}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Talent Score · {LEARNER_STATS.rank}
            </div>
            <Button size="sm" variant="outline" className="mt-3">
              <Share2 className="size-3.5" /> Share profile
            </Button>
          </div>
        </header>

        {/* Stats row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Verified Skills" value={LEARNER_STATS.verifiedSkills} />
          <Stat label="Challenges" value={LEARNER_STATS.completedChallenges} />
          <Stat label="Global Rank" value={LEARNER_STATS.globalRank} />
          <Stat label="Available For" value="Full-time" />
        </section>

        {/* Skills */}
        <section>
          <div className="label-mono mb-3">Verified Skill Matrix</div>
          <div className="grid md:grid-cols-2 gap-4">
            {SKILL_PROGRESS.map((s) => (
              <div key={s.skill} className="border rounded-lg p-4 bg-surface">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{s.skill}</span>
                  <span className="font-mono text-muted-foreground tabular-nums">{s.percent}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${s.percent >= 85 ? "bg-success" : "bg-foreground"}`} style={{ width: `${s.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed challenges */}
        <section>
          <div className="label-mono mb-3">Completed Proof-of-Work</div>
          <div className="border rounded-lg overflow-hidden bg-surface">
            {SUBMISSIONS.map((s) => {
              const c = getChallenge(s.challengeId);
              return (
                <div key={s.id} className="flex items-center gap-4 p-4 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{c?.title}</div>
                    <div className="text-xs text-muted-foreground">{c?.category} · {c?.difficulty}</div>
                  </div>
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
                  <div className="text-right shrink-0">
                    <div className="font-bold tabular-nums">{s.score}/100</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Badges */}
        <section>
          <div className="label-mono mb-3">Badges</div>
          <div className="grid sm:grid-cols-3 gap-4">
            {BADGES.map((b) => (
              <div key={b.id} className="border rounded-lg p-5 bg-surface">
                <div
                  className={`size-10 rounded-md flex items-center justify-center text-sm font-bold mb-3 ${
                    b.tier === "Gold"
                      ? "bg-warning/15 text-warning-foreground"
                      : b.tier === "Silver"
                      ? "bg-muted text-foreground"
                      : "bg-success/15 text-success-foreground"
                  }`}
                >
                  {b.tier[0]}
                </div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{b.earnedFor}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-5 bg-surface">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
