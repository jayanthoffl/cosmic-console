import { useState, useEffect } from "react";
import { Mission } from "@/services/missionService";
import { planetsData } from "@/data/planets";

interface MissionFormProps {
  mission?: Mission | null;
  onSubmit: (data: Omit<Mission, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const MissionForm = ({ mission, onSubmit, onCancel, isLoading }: MissionFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    destination: "Mars",
    status: "planned" as Mission["status"],
    launchDate: "",
    crew: 0,
    objective: "",
    notes: "",
  });

  useEffect(() => {
    if (mission) {
      setFormData({
        name: mission.name,
        destination: mission.destination,
        status: mission.status,
        launchDate: mission.launchDate,
        crew: mission.crew,
        objective: mission.objective,
        notes: mission.notes,
      });
    }
  }, [mission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "crew" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        <span className="text-terminal-amber">$</span> {mission ? "edit" : "create"}_mission --interactive
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">MISSION_NAME:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="terminal-input w-full"
            placeholder="ARTEMIS-VII"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">DESTINATION:</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="terminal-input w-full"
          >
            {planetsData.map((planet) => (
              <option key={planet.id} value={planet.name}>
                {planet.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">STATUS:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="terminal-input w-full"
          >
            <option value="planned">PLANNED</option>
            <option value="active">ACTIVE</option>
            <option value="completed">COMPLETED</option>
            <option value="aborted">ABORTED</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">LAUNCH_DATE:</label>
          <input
            type="date"
            name="launchDate"
            value={formData.launchDate}
            onChange={handleChange}
            required
            className="terminal-input w-full"
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">CREW_SIZE:</label>
          <input
            type="number"
            name="crew"
            value={formData.crew}
            onChange={handleChange}
            min="0"
            className="terminal-input w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">PRIMARY_OBJECTIVE:</label>
        <input
          type="text"
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          required
          className="terminal-input w-full"
          placeholder="Scientific exploration and data collection"
        />
      </div>

      <div>
        <label className="block text-xs text-muted-foreground mb-1">NOTES:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="terminal-input w-full resize-none"
          placeholder="Additional mission notes..."
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={isLoading}
          className="terminal-btn flex-1"
        >
          {isLoading ? "PROCESSING..." : mission ? "UPDATE_MISSION" : "CREATE_MISSION"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="terminal-btn terminal-btn-danger"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default MissionForm;
