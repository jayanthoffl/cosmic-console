import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const TerminalHeader = () => {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [blinkVisible, setBlinkVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setBlinkVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  const navItems = [
    { path: "/", label: "HOME", cmd: "cd ~" },
    { path: "/planets", label: "PLANETS", cmd: "ls /planets" },
    { path: "/missions", label: "MISSIONS", cmd: "cat missions.db" },
    { path: "/about", label: "ABOUT", cmd: "man solar" },
  ];

  return (
    <header className="terminal-window border-b border-border sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-card/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/80" />
            <span className="w-3 h-3 rounded-full bg-accent/80" />
            <span className="w-3 h-3 rounded-full bg-primary/80" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">
            solar-system-explorer@v2.4.1
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            UTC: {time.toUTCString().slice(17, 25)}
          </span>
          <span className="text-terminal-green terminal-glow">
            ● ONLINE
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-3">
        <div className="flex items-center gap-1 text-sm mb-2 text-muted-foreground">
          <span className="text-terminal-amber">user@solarsys</span>
          <span>:</span>
          <span className="text-terminal-cyan">~{location.pathname}</span>
          <span>$</span>
          <span className={blinkVisible ? "opacity-100" : "opacity-0"}>█</span>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-2 px-3 py-1.5 transition-all duration-200 ${
                location.pathname === item.path
                  ? "text-primary terminal-glow border border-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary border border-transparent hover:border-border"
              }`}
            >
              <span className="text-xs text-muted-foreground group-hover:text-terminal-amber transition-colors">
                {item.cmd}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default TerminalHeader;
