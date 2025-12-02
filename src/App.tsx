import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TerminalHeader from "./components/TerminalHeader";
import Index from "./pages/Index";
import Planets from "./pages/Planets";
import PlanetDetail from "./pages/PlanetDetail";
import Missions from "./pages/Missions";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background terminal-window">
          <TerminalHeader />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/planets" element={<Planets />} />
              <Route path="/planets/:id" element={<PlanetDetail />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
