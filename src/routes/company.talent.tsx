import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TALENT_POOL, CATEGORIES, type Category } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/company/talent")({
  head: () => ({
    meta: [
      { title: "Verified Talent — SkillSwap" },
      { name: "description", content: "Search the verified talent pool by skill and Talent Score." },
    ],
  }),
  component: Talent,
});

function Talent() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [minScore, setMinScore] = useState(0);

  const filtered = useMemo(
    () =>
      TALENT_POOL.filter((t) => {
        if (cat !== "All" && t.topCategory !== cat) return false;
        if (t.talentScore < minScore) return false;
        if (q && !(t.name + t.headline + t.verifiedSkills.join(" ")).toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, cat, minScore],
  );

  return (
    <AppLayout breadcrumb={<>Company <span className="mx-2">/</span><span className="text-foreground font-medium">Verified Talent</span></>}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <div className="label-mono mb-2">Talent Pool</div>
          <h1 className="text-2xl font-bold tracking-tight">Verified Candidates</h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input placeholder="Search by name or skill…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip label="All categories" active={cat === "All"} onClick={() => setCat("All")} />
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono mr-1">Min Talent Score</span>
            {[0, 900, 1000, 1100, 1200].map((s) => (
              <Chip key={s} label={s === 0 ? "Any" : `≥ ${s}`} active={minScore === s} onClick={() => setMinScore(s)} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="border rounded-lg p-5 bg-surface">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.headline}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold tabular-nums">{t.talentScore}</div>
                  <div className="font-mono text-[10px] text-success tracking-wider">{t.rank}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {t.verifiedSkills.map((s) => (
                  <Badge key={s} variant="outline" className="font-mono text-[10px]">{s}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs text-muted-foreground">
                <span>{t.completedChallenges} verified · {t.availableFor}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View profile</Button>
                  <Button size="sm">Invite</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-surface text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
