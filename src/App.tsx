import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import Quiz from "./pages/Quiz";
import Auth from "./pages/Auth";
import CodeEditor from "./pages/CodeEditor";
import HomeworkList from "./pages/HomeworkList";
import HomeworkDetail from "./pages/HomeworkDetail";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:moduleId/:lessonId" element={<LessonDetail />} />
              <Route path="/quiz/:moduleId" element={<Quiz />} />
              <Route path="/code" element={<CodeEditor />} />
              <Route path="/homework" element={<HomeworkList />} />
              <Route path="/homework/:moduleId" element={<HomeworkDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
