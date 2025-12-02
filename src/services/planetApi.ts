import axios from "axios";
import { planetsData } from "@/data/planets";

// Solar System OpenData API (fallback to local data)
const NASA_API_BASE = "https://api.le-systeme-solaire.net/rest/bodies";

export interface NasaPlanet {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons: { moon: string }[] | null;
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclination: number;
  mass: { massValue: number; massExponent: number } | null;
  vol: { volValue: number; volExponent: number } | null;
  density: number;
  gravity: number;
  escape: number;
  meanRadius: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimension: string;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet: object | null;
  discoveredBy: string;
  discoveryDate: string;
  alternativeName: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: string;
}

export const fetchPlanetsFromApi = async () => {
  try {
    const response = await axios.get<{ bodies: NasaPlanet[] }>(NASA_API_BASE, {
      params: {
        filter: "isPlanet,eq,true",
      },
      timeout: 5000,
    });

    console.log("[API] Successfully fetched planets from NASA API");
    return response.data.bodies;
  } catch (error) {
    console.warn("[API] Failed to fetch from NASA API, using local data", error);
    return null;
  }
};

export const fetchPlanetDetails = async (planetName: string) => {
  try {
    const response = await axios.get<NasaPlanet>(`${NASA_API_BASE}/${planetName.toLowerCase()}`, {
      timeout: 5000,
    });
    console.log(`[API] Fetched details for ${planetName}`);
    return response.data;
  } catch (error) {
    console.warn(`[API] Failed to fetch ${planetName}, using local data`);
    return null;
  }
};

// Merge API data with local enriched data
export const getEnrichedPlanetData = async () => {
  const apiData = await fetchPlanetsFromApi();

  return planetsData.map((localPlanet) => {
    const apiPlanet = apiData?.find(
      (p) => p.englishName.toLowerCase() === localPlanet.name.toLowerCase()
    );

    if (apiPlanet) {
      return {
        ...localPlanet,
        apiData: {
          gravity: apiPlanet.gravity,
          avgTemp: apiPlanet.avgTemp,
          density: apiPlanet.density,
          meanRadius: apiPlanet.meanRadius,
          sideralOrbit: apiPlanet.sideralOrbit,
          sideralRotation: apiPlanet.sideralRotation,
          moonCount: apiPlanet.moons?.length || 0,
        },
      };
    }
    return localPlanet;
  });
};
