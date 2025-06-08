
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import Scope1 from "./pages/Scope1";
import Scope2 from "./pages/Scope2";
import Scope3 from "./pages/Scope3";
import Decarbonization from "./pages/Decarbonization";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Analysis from "./pages/Analysis";
import Methodology from "./pages/Methodology";
import Reference from "./pages/Reference";
import Reports from "./pages/Reports";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Funding from "./pages/Funding"; // Disabled for demo mode
import AccessibilityPanel from "./components/AccessibilityPanel";
import FloatingActionButton from "./components/FloatingActionButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={
                <Layout>
                  <About />
                </Layout>
              } />
              <Route path="/contact" element={
                <Layout>
                  <Contact />
                </Layout>
              } />
              {/* Funding route disabled for demo mode */}
              {/* <Route path="/funding" element={
                <Layout>
                  <Funding />
                </Layout>
              } /> */}
              {/* Demo mode: All pages accessible without authentication */}
              <Route path="/home" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/dashboard" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/tracking" element={
                <Layout>
                  <Tracking />
                </Layout>
              } />
              <Route path="/scope1" element={
                <Layout>
                  <Scope1 />
                </Layout>
              } />
              <Route path="/scope2" element={
                <Layout>
                  <Scope2 />
                </Layout>
              } />
              <Route path="/scope3" element={
                <Layout>
                  <Scope3 />
                </Layout>
              } />
              <Route path="/decarbonization" element={
                <Layout>
                  <Decarbonization />
                </Layout>
              } />
              <Route path="/profile" element={
                <Layout>
                  <Profile />
                </Layout>
              } />
              <Route path="/reports" element={
                <Layout>
                  <Reports />
                </Layout>
              } />
              <Route path="/analysis" element={
                <Layout>
                  <Analysis />
                </Layout>
              } />
              <Route path="/methodology" element={
                <Layout>
                  <Methodology />
                </Layout>
              } />
              <Route path="/reference" element={
                <Layout>
                  <Reference />
                </Layout>
              } />
              <Route path="*" element={<Landing />} />
            </Routes>
            <AccessibilityPanel />
            <FloatingActionButton />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
