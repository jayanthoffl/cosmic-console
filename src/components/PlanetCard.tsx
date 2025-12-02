import { Link } from "react-router-dom";

interface PlanetCardProps {
  id: number;
  name: string;
  type: string;
  distance: string;
  moons: number;
  color: string;
  temperature: string;
}

const PlanetCard = ({ id, name, type, distance, moons, color, temperature }: PlanetCardProps) => {
  return (
    <Link to={`/planets/${id}`} className="block">
      <div className="planet-card group cursor-pointer">
        {/* Planet visual */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${color}, ${color}88, ${color}44)`,
              boxShadow: `0 0 20px ${color}44, inset -5px -5px 10px rgba(0,0,0,0.4)`,
            }}
          />
          <div>
            <h3 className="text-lg font-bold text-primary terminal-glow">{name}</h3>
            <p className="text-xs text-terminal-amber">[{type.toUpperCase()}]</p>
          </div>
        </div>

        {/* Data readout */}
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between border-b border-border/30 pb-1">
            <span className="text-muted-foreground">DISTANCE:</span>
            <span className="text-foreground">{distance}</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-1">
            <span className="text-muted-foreground">MOONS:</span>
            <span className="text-terminal-cyan">{moons}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">TEMP:</span>
            <span className="text-terminal-amber">{temperature}</span>
          </div>
        </div>

        {/* Access prompt */}
        <div className="mt-4 pt-3 border-t border-border/30 text-xs text-muted-foreground group-hover:text-primary transition-colors">
          <span className="text-terminal-green">→</span> ACCESS DATABASE ENTRY
        </div>
      </div>
    </Link>
  );
};

export default PlanetCard;
