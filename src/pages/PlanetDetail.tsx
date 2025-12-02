import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlanetById, planetsData } from "@/data/planets";
import { fetchPlanetDetails } from "@/services/planetApi";

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState<(typeof planetsData)[0] | null>(null);
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlanet = async () => {
      setLoading(true);
      const localPlanet = getPlanetById(parseInt(id || "0"));
      if (localPlanet) {
        setPlanet(localPlanet);
        // Fetch additional API data
        const apiDetails = await fetchPlanetDetails(localPlanet.name);
        setApiData(apiDetails);
      }
      setLoading(false);
    };
    loadPlanet();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary terminal-glow animate-pulse">
          LOADING PLANETARY DATA...
        </div>
      </div>
    );
  }

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-terminal-red text-xl mb-4">
            ERROR 404: PLANET NOT FOUND
          </div>
          <button onClick={() => navigate("/planets")} className="terminal-btn">
            RETURN TO DATABASE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span className="text-terminal-green">$</span> cat /planets/{planet.name.toLowerCase()}.dat
        </div>

        {/* Planet Header */}
        <div className="terminal-border p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Planet Visual */}
            <div
              className="w-32 h-32 md:w-48 md:h-48 rounded-full flex-shrink-0 animate-float"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88, ${planet.color}44)`,
                boxShadow: `0 0 40px ${planet.color}44, inset -10px -10px 30px rgba(0,0,0,0.4)`,
              }}
            />

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary terminal-glow mb-2">
                {planet.name.toUpperCase()}
              </h1>
              <p className="text-terminal-amber mb-4">[{planet.type.toUpperCase()}]</p>
              <p className="text-muted-foreground leading-relaxed">
                {planet.description}
              </p>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="terminal-border p-4">
            <h3 className="text-terminal-cyan text-sm mb-3">PHYSICAL_PROPERTIES</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Diameter:</span>
                <span>{planet.diameter}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gravity:</span>
                <span>{planet.gravity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Temperature:</span>
                <span className="text-terminal-amber">{planet.temperature}</span>
              </div>
            </div>
          </div>

          <div className="terminal-border p-4">
            <h3 className="text-terminal-cyan text-sm mb-3">ORBITAL_DATA</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance from Sun:</span>
                <span>{planet.distance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Day Length:</span>
                <span>{planet.dayLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Year Length:</span>
                <span>{planet.yearLength}</span>
              </div>
            </div>
          </div>

          <div className="terminal-border p-4">
            <h3 className="text-terminal-cyan text-sm mb-3">ATMOSPHERE</h3>
            <p className="text-sm text-muted-foreground">{planet.atmosphere}</p>
          </div>

          <div className="terminal-border p-4">
            <h3 className="text-terminal-cyan text-sm mb-3">SATELLITES</h3>
            <div className="text-3xl font-bold text-primary terminal-glow">
              {planet.moons}
            </div>
            <p className="text-xs text-muted-foreground">known moons</p>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="terminal-border p-4 mb-6 border-terminal-amber">
          <h3 className="text-terminal-amber text-sm mb-2">
            <span className="mr-2">⚡</span>FUN_FACT
          </h3>
          <p className="text-foreground">{planet.funFact}</p>
        </div>

        {/* API Data (if available) */}
        {apiData && (
          <div className="terminal-border p-4 mb-6">
            <h3 className="text-terminal-green text-sm mb-3">
              LIVE_API_DATA [le-systeme-solaire.net]
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Mean Radius:</span>
                <span>{apiData.meanRadius?.toLocaleString()} km</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Density:</span>
                <span>{apiData.density?.toFixed(2)} g/cm³</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Escape Velocity:</span>
                <span>{apiData.escape?.toLocaleString()} m/s</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Axial Tilt:</span>
                <span>{apiData.axialTilt?.toFixed(2)}°</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <button onClick={() => navigate("/planets")} className="terminal-btn">
            ← BACK TO DATABASE
          </button>
          <button
            onClick={() => navigate(`/missions`)}
            className="terminal-btn"
          >
            PLAN MISSION TO {planet.name.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;
