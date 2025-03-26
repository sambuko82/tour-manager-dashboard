
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/ui/theme-provider";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const paths = [
    { path: "/", label: "Dashboard" },
    { path: "/resources", label: "Resources" },
    { path: "/accommodations", label: "Accommodations" },
    { path: "/finances", label: "Finances" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold tracking-tight text-xl">
            Tour Manager
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {paths.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link",
                  location.pathname === item.path && "active"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium hidden sm:inline-block">
                Welcome, {user.username}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
