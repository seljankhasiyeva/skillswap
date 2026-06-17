import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { getChallenge } from "@/lib/mock-data";
import { Clock, Users, ArrowLeft, CheckCircle2, Sparkles, GitBranch } from "lucide-react";

export const Route = createFileRoute("/learner/challenges/$id")({
  head: ({ params }) => {
    const c = getChallenge(params.id);
    return {
      meta: [
        { title: c ? `${c.title} — SkillSwap` : "Challenge — SkillSwap" },
        {
          name: "description",
          content: c?.summary ?? "Real-world skill challenge on SkillSwap.",
        },
      ],
    };
  },
  loader: ({ params }): import("@/lib/mock-data").Challenge => {
    const c = getChallenge(params.id);
    if (!c) throw notFound();
    return c;
  },

  notFoundComponent: () => (
    <AppLayout>
      <div className="p-12 text-center">
        <h1 className="text-xl font-semibold">Challenge not found</h1>
        <p className="text-muted-foreground mt-2">It may have been removed.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/learner/challenges">Back to marketplace</Link>
        </Button>
      </div>
    </AppLayout>
  ),
  errorComponent: () => (
    <AppLayout>
      <div className="p-12 text-center text-muted-foreground">Something went wrong loading this challenge.</div>
    </AppLayout>
  ),
  component: ChallengeDetail,
});

function ChallengeDetail() {
  const c = Route.useLoaderData();
  const [submitted, setSubmitted] = useState(false);

  return (
    <AppLayout
      breadcrumb={
        <Link to="/learner/challenges" className="flex items-center gap-1.5 hover:text-foreground">
          <ArrowLeft className="size-3.5" /> All challenges
        </Link>
      }
    >
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
            {c.category}
          </Badge>
          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">
            {c.difficulty}
          </Badge>
          {c.isCompanyChallenge && (
            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider border-foreground/30">
              Hiring · {c.companyName}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-balance">{c.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-3xl text-pretty">{c.summary}</p>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <Section title="Brief">
              <p className="text-sm leading-relaxed">{c.description}</p>
            </Section>
            <Section title="Requirements">
              <BulletList items={c.requirements} />
            </Section>
            <Section title="Deliverables">
              <BulletList items={c.deliverables} />
            </Section>
            <Section title="Learning Outcomes">
              <BulletList items={c.outcomes} />
            </Section>
            <Section title="Evaluation Criteria">
              <BulletList items={c.evaluation} />
            </Section>
          </div>

          <aside className="space-y-5">
            <div className="border rounded-lg p-5 bg-surface space-y-4 sticky top-20">
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold tabular-nums">
                  {c.price === 0 ? "Free" : `$${c.price.toFixed(2)}`}
                </div>
                <div className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  +{c.rewardPoints} PTS
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    {c.price === 0 ? "Start challenge" : "Unlock & start"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit your work</DialogTitle>
                  </DialogHeader>
                  {!submitted ? (
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                    >
                      <div>
                        <Label htmlFor="github" className="mb-1.5 block text-sm">GitHub repo URL</Label>
                        <Input id="github" placeholder="https://github.com/you/project" />
                      </div>
                      <div>
                        <Label htmlFor="notes" className="mb-1.5 block text-sm">Notes for the reviewer</Label>
                        <Textarea id="notes" rows={3} placeholder="Anything the AI / mentor should know…" />
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="w-full">
                          <Sparkles className="size-4" />
                          Submit for AI evaluation
                        </Button>
                      </DialogFooter>
                    </form>
                  ) : (
                    <div className="space-y-4 py-2">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-success/15 grid place-items-center">
                          <CheckCircle2 className="size-4 text-success" />
                        </div>
                        <div>
                          <div className="font-semibold">Submission received</div>
                          <div className="text-xs text-muted-foreground">
                            AI evaluation usually completes in 1–3 minutes.
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-4 font-mono text-[11px] leading-relaxed">
                        <div className="text-success">[QUEUED]</div>
                        <div className="text-muted-foreground">analyzing repository…</div>
                        <div className="text-muted-foreground">running rubric: 4 criteria</div>
                        <div className="text-muted-foreground">drafting feedback…</div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <Stat icon={Clock} label="Estimated" value={`~${c.estimatedHours}h`} />
                <Stat icon={Users} label="Completed" value={c.completedCount} />
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.technologies.map((t: string) => (
                    <Badge key={t} variant="outline" className="font-mono text-[10px]">{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  Authored by
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-muted grid place-items-center text-xs font-semibold">
                    {c.mentorName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{c.mentorName}</div>
                    <div className="text-[11px] text-muted-foreground">{c.mentorOrg}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/40 flex items-start gap-3 text-xs text-muted-foreground">
              <GitBranch className="size-4 mt-0.5 shrink-0" />
              <span>Submit via GitHub, file upload, or a hosted project link. AI grades against the rubric and the mentor signs off on verification.</span>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </div>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i: string) => (
        <li key={i} className="flex gap-3 text-sm">
          <CheckCircle2 className="size-4 text-success shrink-0 mt-0.5" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
        <Icon className="size-3" /> {label}
      </div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
