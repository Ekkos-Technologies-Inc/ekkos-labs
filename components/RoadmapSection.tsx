interface RoadmapItemProps {
  period: string;
  focus: string;
  outcomes: string;
  milestones: string[];
}

export function RoadmapSection({
  period,
  focus,
  outcomes,
  milestones,
}: RoadmapItemProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">{period}</h3>
        <div className="mt-2 space-y-2">
          <div>
            <span className="text-sm font-semibold text-primary">Focus:</span>
            <p className="mt-1 text-sm text-white/80">{focus}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-accent">Outcomes:</span>
            <p className="mt-1 text-sm text-white/80">{outcomes}</p>
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {milestones.map((milestone, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-white/70">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
            <span>{milestone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}




















































































































































































































