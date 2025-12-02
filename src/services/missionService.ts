// Mock JSON Server using localStorage
// This simulates a REST API with full CRUD operations

export interface Mission {
  id: string;
  name: string;
  destination: string;
  status: "planned" | "active" | "completed" | "aborted";
  launchDate: string;
  crew: number;
  objective: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "solar_missions";

const getStoredMissions = (): Mission[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with some default missions
  const defaultMissions: Mission[] = [
    {
      id: "mission-001",
      name: "ARTEMIS-X",
      destination: "Mars",
      status: "planned",
      launchDate: "2025-06-15",
      crew: 4,
      objective: "Establish first human colony foothold",
      notes: "Awaiting final equipment tests",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "mission-002",
      name: "EUROPA PROBE",
      destination: "Jupiter",
      status: "active",
      launchDate: "2024-03-22",
      crew: 0,
      objective: "Subsurface ocean exploration",
      notes: "Currently in transit, all systems nominal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMissions));
  return defaultMissions;
};

const saveMissions = (missions: Mission[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// CREATE
export const createMission = async (missionData: Omit<Mission, "id" | "createdAt" | "updatedAt">): Promise<Mission> => {
  await delay(300);
  const missions = getStoredMissions();
  const newMission: Mission = {
    ...missionData,
    id: `mission-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  missions.push(newMission);
  saveMissions(missions);
  return newMission;
};

// READ ALL
export const getAllMissions = async (): Promise<Mission[]> => {
  await delay(200);
  return getStoredMissions();
};

// READ ONE
export const getMissionById = async (id: string): Promise<Mission | null> => {
  await delay(150);
  const missions = getStoredMissions();
  return missions.find((m) => m.id === id) || null;
};

// UPDATE
export const updateMission = async (id: string, updates: Partial<Mission>): Promise<Mission | null> => {
  await delay(300);
  const missions = getStoredMissions();
  const index = missions.findIndex((m) => m.id === id);
  if (index === -1) return null;

  missions[index] = {
    ...missions[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveMissions(missions);
  return missions[index];
};

// DELETE
export const deleteMission = async (id: string): Promise<boolean> => {
  await delay(200);
  const missions = getStoredMissions();
  const filtered = missions.filter((m) => m.id !== id);
  if (filtered.length === missions.length) return false;
  saveMissions(filtered);
  return true;
};

// Search/Filter
export const searchMissions = async (query: string): Promise<Mission[]> => {
  await delay(200);
  const missions = getStoredMissions();
  const lowerQuery = query.toLowerCase();
  return missions.filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.destination.toLowerCase().includes(lowerQuery) ||
      m.objective.toLowerCase().includes(lowerQuery)
  );
};
