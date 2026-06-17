import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { TALENT_POOL } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/learner/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — SkillSwap" },
      { name: "description", content: "Global talent leaderboard ranked by Talent Score." },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <AppLayout
      breadcrumb={
        <>
          Learner <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Leaderboard</span>
        </>
      }
    >
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <div className="label-mono mb-2">Global standing</div>
          <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
        </div>

        <div className="border rounded-lg overflow-hidden bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="px-5 py-3 label-mono">#</th>
                <th className="px-5 py-3 label-mono">Member</th>
                <th className="px-5 py-3 label-mono hidden md:table-cell">Top Skills</th>
                <th className="px-5 py-3 label-mono text-right">Score</th>
                <th className="px-5 py-3 label-mono text-right hidden sm:table-cell">Rank</th>
              </tr>
            </thead>
            <tbody>
              {TALENT_POOL.map((t, i) => (
                <tr key={t.id} className="border-t hover:bg-muted/40">
                  <td className="px-5 py-3 font-mono tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </td>
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
    </AppLayout>
  );
}
