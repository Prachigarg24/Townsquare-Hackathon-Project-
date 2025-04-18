
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Issues from "./pages/Issues";
import Legislation from "./pages/Legislation";
import Representatives from "./pages/Representatives";
import Initiatives from "./pages/Initiatives";
import Impact from "./pages/Impact";
import Polls from "./pages/Polls";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/legislation" element={<Legislation />} />
              <Route path="/representatives" element={<Representatives />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/polls" element={<Polls />} />
              <Route path="/login" element={<Login />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
