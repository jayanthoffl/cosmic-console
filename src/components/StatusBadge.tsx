interface StatusBadgeProps {
  status: "planned" | "active" | "completed" | "aborted";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    planned: {
      label: "PLANNED",
      className: "text-terminal-amber border-terminal-amber",
    },
    active: {
      label: "ACTIVE",
      className: "text-terminal-green border-terminal-green terminal-glow",
    },
    completed: {
      label: "COMPLETED",
      className: "text-terminal-cyan border-terminal-cyan",
    },
    aborted: {
      label: "ABORTED",
      className: "text-terminal-red border-terminal-red",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono border ${config.className}`}
    >
      <span className="mr-1.5">●</span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
