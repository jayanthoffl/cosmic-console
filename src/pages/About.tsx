import { useState, useEffect } from "react";

const About = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const systemLogs = [
      "[BOOT] Initializing Solar System Explorer v2.4.1...",
      "[OK] React.js core loaded",
      "[OK] Three.js rendering engine online",
      "[OK] Axios HTTP client configured",
      "[OK] React Router DOM navigation active",
      "[OK] Tailwind CSS styling applied",
      "[OK] Local storage database connected",
      "[INFO] System ready for exploration",
    ];

    let index = 0;
    const timer = setInterval(() => {
      if (index < systemLogs.length) {
        setLogs((prev) => [...prev, systemLogs[index]]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <span className="text-terminal-green">$</span> man solar-explorer
          </div>
          <h1 className="text-3xl font-bold text-primary terminal-glow mb-2">
            SYSTEM DOCUMENTATION
          </h1>
        </div>

        {/* Boot Log */}
        <div className="terminal-border p-4 mb-6 font-mono text-sm">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`${
                log.includes("[OK]")
                  ? "text-terminal-green"
                  : log.includes("[INFO]")
                  ? "text-terminal-cyan"
                  : "text-muted-foreground"
              }`}
            >
              {log}
            </div>
          ))}
          {logs.length === 8 && (
            <div className="text-primary terminal-glow mt-2 animate-pulse">
              █ System operational
            </div>
          )}
        </div>

        {/* About Sections */}
        <div className="space-y-6">
          <section className="terminal-border p-6">
            <h2 className="text-xl text-terminal-amber mb-4">PROJECT_OVERVIEW</h2>
            <p className="text-muted-foreground leading-relaxed">
              Solar System Explorer is an interactive web application that provides
              comprehensive information about our solar system's planets. Built with
              a retro terminal aesthetic, it combines modern web technologies with
              a nostalgic interface design.
            </p>
          </section>

          <section className="terminal-border p-6">
            <h2 className="text-xl text-terminal-amber mb-4">TECHNOLOGY_STACK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="text-terminal-cyan mb-2">Frontend Framework</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• React.js 18.x</li>
                  <li>• React Router DOM 6.x</li>
                  <li>• Tailwind CSS 3.x</li>
                </ul>
              </div>
              <div>
                <h3 className="text-terminal-cyan mb-2">3D Rendering</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Three.js</li>
                  <li>• @react-three/fiber</li>
                  <li>• @react-three/drei</li>
                </ul>
              </div>
              <div>
                <h3 className="text-terminal-cyan mb-2">Data Management</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Axios for API calls</li>
                  <li>• localStorage (JSON Server simulation)</li>
                  <li>• NASA Solar System API</li>
                </ul>
              </div>
              <div>
                <h3 className="text-terminal-cyan mb-2">Features</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Full CRUD operations</li>
                  <li>• Real-time API integration</li>
                  <li>• Interactive 3D solar system</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="terminal-border p-6">
            <h2 className="text-xl text-terminal-amber mb-4">API_ENDPOINTS</h2>
            <div className="space-y-3 text-sm font-mono">
              <div className="p-3 bg-background rounded">
                <span className="text-terminal-green">GET</span>
                <span className="text-muted-foreground ml-2">
                  https://api.le-systeme-solaire.net/rest/bodies
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Fetches planetary data from NASA Solar System OpenData
                </p>
              </div>
              <div className="p-3 bg-background rounded">
                <span className="text-terminal-cyan">LOCAL</span>
                <span className="text-muted-foreground ml-2">
                  localStorage://solar_missions
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  CRUD operations for user missions (simulated JSON Server)
                </p>
              </div>
            </div>
          </section>

          <section className="terminal-border p-6">
            <h2 className="text-xl text-terminal-amber mb-4">KEYBOARD_SHORTCUTS</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Navigate:</span>
                <kbd className="px-2 py-0.5 bg-background text-primary">Arrow Keys</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">3D Rotate:</span>
                <kbd className="px-2 py-0.5 bg-background text-primary">Mouse Drag</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">3D Zoom:</span>
                <kbd className="px-2 py-0.5 bg-background text-primary">Scroll</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Select Planet:</span>
                <kbd className="px-2 py-0.5 bg-background text-primary">Click</kbd>
              </div>
            </div>
          </section>

          <section className="terminal-border p-6 border-terminal-green">
            <h2 className="text-xl text-terminal-green mb-4">CREDITS</h2>
            <p className="text-muted-foreground text-sm">
              Planetary data sourced from NASA and the Solar System OpenData API.
              Built with passion for space exploration and retro computing aesthetics.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>Version: 2.4.1</p>
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
