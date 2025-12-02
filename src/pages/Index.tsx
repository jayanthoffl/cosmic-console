import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SolarSystem3D from "@/components/SolarSystem3D";
import TypewriterText from "@/components/TypewriterText";
import { planetsData } from "@/data/planets";

const Index = () => {
  const navigate = useNavigate();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [stats, setStats] = useState({ planets: 0, missions: 0, distance: 0 });

  useEffect(() => {
    // Animate stats
    const timer = setTimeout(() => {
      setStats({ planets: 8, missions: 2, distance: 4500 });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = (planetName: string) => {
    const planet = planetsData.find((p) => p.name === planetName);
    if (planet) {
      navigate(`/planets/${planet.id}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* ASCII Art Header */}
          <pre className="text-primary terminal-glow text-xs md:text-sm leading-tight mb-8 overflow-x-auto">
{`
 ███████╗ ██████╗ ██╗      █████╗ ██████╗     ███████╗██╗   ██╗███████╗
 ██╔════╝██╔═══██╗██║     ██╔══██╗██╔══██╗    ██╔════╝╚██╗ ██╔╝██╔════╝
 ███████╗██║   ██║██║     ███████║██████╔╝    ███████╗ ╚████╔╝ ███████╗
 ╚════██║██║   ██║██║     ██╔══██║██╔══██╗    ╚════██║  ╚██╔╝  ╚════██║
 ███████║╚██████╔╝███████╗██║  ██║██║  ██║    ███████║   ██║   ███████║
 ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚══════╝
`}
          </pre>

          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-primary terminal-glow mb-4">
              <TypewriterText
                text="SOLAR SYSTEM EXPLORER v2.4.1"
                speed={40}
                onComplete={() => setShowSubtitle(true)}
              />
            </h1>
            {showSubtitle && (
              <p className="text-muted-foreground text-lg">
                <TypewriterText
                  text="> Interactive planetary database and mission control terminal"
                  speed={20}
                />
              </p>
            )}
          </div>

          {/* System Status */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="terminal-border p-4 text-center">
              <div className="text-3xl font-bold text-primary terminal-glow">
                {stats.planets}
              </div>
              <div className="text-xs text-muted-foreground">PLANETS</div>
            </div>
            <div className="terminal-border p-4 text-center">
              <div className="text-3xl font-bold text-terminal-amber terminal-glow-amber">
                {stats.missions}
              </div>
              <div className="text-xs text-muted-foreground">ACTIVE MISSIONS</div>
            </div>
            <div className="terminal-border p-4 text-center">
              <div className="text-3xl font-bold text-terminal-cyan terminal-glow-cyan">
                {stats.distance}M
              </div>
              <div className="text-xs text-muted-foreground">KM TO NEPTUNE</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Solar System */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className="text-terminal-green">$</span>
            <span className="text-muted-foreground">render</span>
            <span className="text-foreground">--mode=3d</span>
            <span className="text-foreground">solar_system.model</span>
          </div>
          <div className="relative">
            <SolarSystem3D onPlanetClick={handlePlanetClick} />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-muted-foreground mb-6">
            <span className="text-terminal-amber">root@solarsys</span>
            <span>:</span>
            <span className="text-terminal-cyan">~</span>
            <span># Available commands:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/planets")}
              className="terminal-border p-6 text-left hover:bg-primary/5 transition-all group"
            >
              <div className="text-primary terminal-glow text-lg mb-2 group-hover:animate-pulse-glow">
                ./explore_planets.sh
              </div>
              <p className="text-muted-foreground text-sm">
                Access comprehensive database of all 8 planets in our solar system.
                View detailed statistics, atmospheric data, and orbital mechanics.
              </p>
            </button>

            <button
              onClick={() => navigate("/missions")}
              className="terminal-border p-6 text-left hover:bg-primary/5 transition-all group"
            >
              <div className="text-terminal-amber terminal-glow-amber text-lg mb-2 group-hover:animate-pulse-glow">
                ./mission_control.sh
              </div>
              <p className="text-muted-foreground text-sm">
                Create, manage, and track space exploration missions.
                Full CRUD operations for mission planning and execution.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Log */}
      <footer className="px-4 py-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-xs text-muted-foreground font-mono">
          <p>[{new Date().toISOString()}] System initialized successfully</p>
          <p>[INFO] All subsystems operational</p>
          <p>[INFO] Database connection: LOCAL_STORAGE</p>
          <p className="text-terminal-green mt-2">Ready for input...</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
