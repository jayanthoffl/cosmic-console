import { useState, useEffect } from "react";
import PlanetCard from "@/components/PlanetCard";
import { planetsData } from "@/data/planets";
import { getEnrichedPlanetData } from "@/services/planetApi";

const Planets = () => {
  const [planets, setPlanets] = useState(planetsData);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPlanets = async () => {
      setLoading(true);
      try {
        const enrichedData = await getEnrichedPlanetData();
        setPlanets(enrichedData);
      } catch (error) {
        console.error("Failed to fetch planets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPlanets();
  }, []);

  const filteredPlanets = planets.filter((planet) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "terrestrial" && planet.type === "Terrestrial") ||
      (filter === "gas" && planet.type === "Gas Giant") ||
      (filter === "ice" && planet.type === "Ice Giant");

    const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <span className="text-terminal-green">$</span> ls -la /planets/
          </div>
          <h1 className="text-3xl font-bold text-primary terminal-glow mb-2">
            PLANETARY DATABASE
          </h1>
          <p className="text-muted-foreground">
            Comprehensive data on all {planets.length} planets in our solar system
          </p>
        </div>

        {/* Controls */}
        <div className="terminal-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs text-muted-foreground mb-1">
                SEARCH_QUERY:
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="grep planet_name..."
                className="terminal-input w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">
                FILTER_TYPE:
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="terminal-input"
              >
                <option value="all">ALL_TYPES</option>
                <option value="terrestrial">TERRESTRIAL</option>
                <option value="gas">GAS_GIANT</option>
                <option value="ice">ICE_GIANT</option>
              </select>
            </div>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            Found {filteredPlanets.length} entries matching criteria
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="terminal-border p-8 text-center">
            <div className="text-primary terminal-glow animate-pulse">
              FETCHING DATA FROM API...
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Connecting to le-systeme-solaire.net
            </div>
          </div>
        )}

        {/* Planets Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlanets.map((planet) => (
              <PlanetCard
                key={planet.id}
                id={planet.id}
                name={planet.name}
                type={planet.type}
                distance={planet.distance}
                moons={planet.moons}
                color={planet.color}
                temperature={planet.temperature}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredPlanets.length === 0 && (
          <div className="terminal-border p-8 text-center">
            <div className="text-terminal-amber">
              ERROR: No planets found matching query
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Try adjusting your search parameters
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Planets;
