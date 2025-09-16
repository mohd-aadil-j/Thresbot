import { BarChart3, TrendingUp, Settings, LogOut, Home, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Add Trade", url: "/dashboard#add-trade", icon: Plus },
  { title: "Stock List", url: "/stocks", icon: TrendingUp },
  { title: "Profile", url: "/profile", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Sign Up", url: "/signup", icon: Plus },
];

export function Sidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  const isActive = (url: string) => {
    if (url.includes('#')) {
      return location.pathname === '/dashboard';
    }
    return location.pathname === url;
  };

  const isCollapsed = state === "collapsed";

  return (
    <SidebarComponent className={`${isCollapsed ? "w-16" : "w-64"} border-r border-border`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <TrendingUp className="w-6 h-6 text-primary" />
            <BarChart3 className="w-4 h-4 text-secondary absolute -bottom-0.5 -right-0.5" />
          </div>
          {!isCollapsed && (
            <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TradingBot
            </span>
          )}
        </div>
      </div>

      {/* Trigger Button */}
      <div className="p-2">
        <SidebarTrigger className="w-full" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`${
                      isActive(item.url) 
                        ? "bg-primary/20 text-primary border border-primary/30" 
                        : "hover:bg-muted/50"
                    } transition-all duration-200`}
                  >
                    <button
                      onClick={() => {
                        if (item.url.includes('#add-trade')) {
                          document.getElementById('add-trade-form')?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate(item.url);
                        }
                      }}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </SidebarComponent>
  );
}