export default function Chip({ label, icon, onClick, className }: { label: string; icon?: string; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 bg-card rounded-full shadow-sm border border-border min-w-[140px] ${className ?? ""}`}>
      <span className="text-lg">{icon ?? "🔖"}</span>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
}