import { Switch, Route, useLocation } from "wouter";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [location] = useLocation();
  
  // Check authentication status for admin routes
  const { data: authData } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (!response.ok) {
          return { authenticated: false };
        }
        return response.json();
      } catch (error) {
        return { authenticated: false };
      }
    },
  });
  
  const isAdmin = authData?.authenticated && authData?.isAdmin;
  const isAdminRoute = location.startsWith("/admin");
  
  // Redirect from admin page if not authenticated
  if (isAdminRoute && location !== "/admin/login" && !isAdmin) {
    window.location.href = "/admin/login";
    return null;
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
