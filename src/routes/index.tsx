import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CHALLENGES, TALENT_POOL } from "@/lib/mock-data";
import { ChallengeCard } from "@/components/challenge-card";
import { ArrowUpRight, CheckCircle2, Cpu, GitBranch, Sparkles, Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillSwap — Prove your skills, get hired" },
      {
        name: "description",
        content:
          "Challenge-based skill validation. Real projects, AI-evaluated, surfaced to companies that hire on proof — not resumes.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const featured = CHALLENGES.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 bg-primary rounded-sm flex items-center justify-center">
              <Cpu className="size-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">SkillSwap</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#challenges" className="hover:text-foreground">Challenges</a>
            <a href="#talent" className="hover:text-foreground">Talent</a>
            <a href="#roles" className="hover:text-foreground">For mentors & companies</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest mb-5">
              <span className="size-1.5 rounded-full bg-success mr-2 animate-pulse" />
              Proof of work, not resumes
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
              Prove what you can build.
              <br />
              <span className="text-muted-foreground">Get found by companies that hire on evidence.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">
              SkillSwap turns real-world challenges into verifiable skill evidence. Submit projects,
              get AI-graded with mentor oversight, and surface to recruiters as a profile recruiters
              actually trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/signup">
                  Start with a free challenge
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#challenges">Browse the marketplace</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> AI evaluation with mentor sign-off</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Verified skill badges</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Direct hiring pipeline</span>
            </div>
          </div>

          {/* Hero proof card */}
          <div className="lg:col-span-5">
            <div className="bg-surface border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="label-mono">Talent Profile · LIVE</div>
                <Badge variant="outline" className="font-mono text-[10px] text-success border-success/30 bg-success/5">
                  VERIFIED
                </Badge>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center font-bold">AR</div>
                <div>
                  <div className="font-semibold">Alex Rivera</div>
                  <div className="text-xs text-muted-foreground">Backend / Distributed Systems</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-bold tabular-nums">1,240</div>
                  <div className="font-mono text-[10px] text-muted-foreground tracking-wider">TALENT SCORE</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { skill: "Distributed Systems", pct: 92 },
                  { skill: "API Security", pct: 88 },
                  { skill: "Go / Rust", pct: 84 },
                ].map((s) => (
                  <div key={s.skill}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium">{s.skill}</span>
                      <span className="font-mono text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-foreground" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground font-mono flex items-center gap-2">
                <GitBranch className="size-3.5" />
                42 verified submissions · 3 companies actively reviewing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="label-mono mb-3">How it works</div>
          <h2 className="text-3xl font-bold tracking-tight mb-10 max-w-2xl">
            One pipeline. From challenge to verified hire.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Pick a challenge",
                body: "Real briefs from mentors and companies. Filter by category, difficulty, and price. Free beginner tracks always available.",
              },
              {
                step: "02",
                title: "Submit proof",
                body: "Ship a GitHub repo, file, or project link. AI grades against a rubric and mentors sign off on verification.",
              },
              {
                step: "03",
                title: "Get discovered",
                body: "Verified skills update your public proof-of-work profile — searchable by hiring companies.",
              },
            ].map((s) => (
              <div key={s.step} className="border rounded-lg p-6 bg-surface">
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">
                  STEP {s.step}
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured challenges */}
      <section id="challenges" className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="label-mono mb-3">Challenge marketplace</div>
              <h2 className="text-3xl font-bold tracking-tight">Live briefs from the field.</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/learner/challenges">Browse all <ArrowUpRight className="size-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((c) => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Talent strip */}
      <section id="talent" className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="label-mono mb-3">Verified talent pool</div>
          <h2 className="text-3xl font-bold tracking-tight mb-8 max-w-2xl">
            Recruiters search proof, not promises.
          </h2>
          <div className="border rounded-lg overflow-hidden bg-surface">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="text-left">
                  <th className="px-5 py-3 font-medium label-mono">Name</th>
                  <th className="px-5 py-3 font-medium label-mono hidden md:table-cell">Top Skills</th>
                  <th className="px-5 py-3 font-medium label-mono text-right">Talent Score</th>
                  <th className="px-5 py-3 font-medium label-mono text-right hidden sm:table-cell">Rank</th>
                </tr>
              </thead>
              <tbody>
                {TALENT_POOL.slice(0, 4).map((t) => (
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
                    <td className="px-5 py-3 text-right text-success hidden sm:table-cell">{t.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-5">
          {[
            {
              icon: GitBranch,
              role: "For learners",
              title: "Build a portfolio that recruiters trust.",
              cta: "Join as a learner",
              to: "/signup?role=learner",
            },
            {
              icon: Sparkles,
              role: "For mentors",
              title: "Author challenges. AI drafts; you sign off.",
              cta: "Become a mentor",
              to: "/signup?role=mentor",
            },
            {
              icon: Building2,
              role: "For companies",
              title: "Hire on evidence. Try before you sign.",
              cta: "Hire on SkillSwap",
              to: "/signup?role=company",
            },
          ].map((card) => (
            <div key={card.role} className="border rounded-lg p-6 bg-surface flex flex-col">
              <card.icon className="size-5 text-muted-foreground mb-4" />
              <div className="label-mono mb-2">{card.role}</div>
              <h3 className="text-lg font-semibold mb-6 text-balance">{card.title}</h3>
              <Button asChild className="mt-auto w-fit" variant="outline">
                <Link to={card.to}>
                  {card.cta} <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="size-5 bg-primary rounded-sm flex items-center justify-center">
              <Cpu className="size-3 text-primary-foreground" />
            </div>
            <span>SkillSwap · proof of work, not resumes</span>
          </div>
          <div className="font-mono text-[10px] tracking-wider uppercase">© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}
