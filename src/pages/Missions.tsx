import { useState, useEffect } from "react";
import { toast } from "sonner";
import MissionForm from "@/components/MissionForm";
import StatusBadge from "@/components/StatusBadge";
import {
  Mission,
  getAllMissions,
  createMission,
  updateMission,
  deleteMission,
} from "@/services/missionService";

const Missions = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadMissions = async () => {
    setLoading(true);
    try {
      const data = await getAllMissions();
      setMissions(data);
    } catch (error) {
      toast.error("Failed to load missions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMissions();
  }, []);

  const handleCreate = async (data: Omit<Mission, "id" | "createdAt" | "updatedAt">) => {
    setSubmitting(true);
    try {
      await createMission(data);
      toast.success("Mission created successfully");
      setShowForm(false);
      loadMissions();
    } catch (error) {
      toast.error("Failed to create mission");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: Omit<Mission, "id" | "createdAt" | "updatedAt">) => {
    if (!editingMission) return;
    setSubmitting(true);
    try {
      await updateMission(editingMission.id, data);
      toast.success("Mission updated successfully");
      setEditingMission(null);
      loadMissions();
    } catch (error) {
      toast.error("Failed to update mission");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMission(id);
      toast.success("Mission deleted");
      setDeleteConfirm(null);
      loadMissions();
    } catch (error) {
      toast.error("Failed to delete mission");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <span className="text-terminal-green">$</span> ./mission_control.sh --list
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary terminal-glow mb-2">
                MISSION CONTROL
              </h1>
              <p className="text-muted-foreground">
                Manage space exploration missions - Full CRUD Operations
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="terminal-btn"
            >
              + NEW_MISSION
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {(showForm || editingMission) && (
          <div className="terminal-border p-6 mb-6">
            <h2 className="text-lg text-terminal-amber mb-4">
              {editingMission ? "EDIT_MISSION" : "CREATE_NEW_MISSION"}
            </h2>
            <MissionForm
              mission={editingMission}
              onSubmit={editingMission ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingMission(null);
              }}
              isLoading={submitting}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="terminal-border p-8 text-center">
            <div className="text-primary terminal-glow animate-pulse">
              LOADING MISSION DATABASE...
            </div>
          </div>
        )}

        {/* Missions List */}
        {!loading && missions.length === 0 && !showForm && (
          <div className="terminal-border p-8 text-center">
            <div className="text-muted-foreground mb-4">
              No missions found in database
            </div>
            <button onClick={() => setShowForm(true)} className="terminal-btn">
              CREATE FIRST MISSION
            </button>
          </div>
        )}

        {!loading && missions.length > 0 && (
          <div className="space-y-4">
            {missions.map((mission) => (
              <div key={mission.id} className="terminal-border p-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-primary terminal-glow">
                        {mission.name}
                      </h3>
                      <StatusBadge status={mission.status} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground block">Destination:</span>
                        <span className="text-terminal-cyan">{mission.destination}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Launch:</span>
                        <span>{mission.launchDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Crew:</span>
                        <span>{mission.crew} personnel</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">ID:</span>
                        <span className="text-xs">{mission.id}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="text-muted-foreground">Objective: </span>
                      <span>{mission.objective}</span>
                    </div>

                    {mission.notes && (
                      <div className="text-sm mt-2 text-muted-foreground italic">
                        Notes: {mission.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingMission(mission)}
                      className="terminal-btn text-sm px-3 py-1"
                    >
                      EDIT
                    </button>
                    {deleteConfirm === mission.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(mission.id)}
                          className="terminal-btn terminal-btn-danger text-sm px-3 py-1"
                        >
                          CONFIRM
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="terminal-btn text-sm px-3 py-1"
                        >
                          CANCEL
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(mission.id)}
                        className="terminal-btn terminal-btn-danger text-sm px-3 py-1"
                      >
                        DELETE
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                  Created: {new Date(mission.createdAt).toLocaleString()} |
                  Updated: {new Date(mission.updatedAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && missions.length > 0 && (
          <div className="mt-8 terminal-border p-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Total Missions: </span>
                <span className="text-primary">{missions.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Active: </span>
                <span className="text-terminal-green">
                  {missions.filter((m) => m.status === "active").length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Planned: </span>
                <span className="text-terminal-amber">
                  {missions.filter((m) => m.status === "planned").length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Completed: </span>
                <span className="text-terminal-cyan">
                  {missions.filter((m) => m.status === "completed").length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Missions;
