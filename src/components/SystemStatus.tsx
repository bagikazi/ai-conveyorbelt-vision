import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Camera, Wifi, Activity } from "lucide-react";

interface ComponentStatus {
  name: string;
  ip: string;
  status: "online" | "offline" | "warning";
  lastHeartbeat?: string;
  icon: React.ComponentType<any>;
}

const SystemStatus = () => {
  const components: ComponentStatus[] = [
    {
      name: "PLC Controller",
      ip: "192.168.250.1",
      status: "online",
      lastHeartbeat: "0.30s ago",
      icon: Cpu
    },
    {
      name: "Vision Camera",
      ip: "192.168.250.100",
      status: "online",
      lastHeartbeat: "Active",
      icon: Camera
    },
    {
      name: "PC Application",
      ip: "Local Host",
      status: "online",
      lastHeartbeat: "Running",
      icon: Activity
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "success";
      case "warning": return "warning";
      case "offline": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusDot = (status: string) => {
    const baseClasses = "w-3 h-3 rounded-full animate-pulse";
    switch (status) {
      case "online": return `${baseClasses} bg-success shadow-[0_0_10px_hsl(var(--success))]`;
      case "warning": return `${baseClasses} bg-warning shadow-[0_0_10px_hsl(var(--warning))]`;
      case "offline": return `${baseClasses} bg-destructive shadow-[0_0_10px_hsl(var(--destructive))]`;
      default: return `${baseClasses} bg-muted`;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Wifi className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Components</h3>
          <p className="text-sm text-muted-foreground">Network connectivity status</p>
        </div>
      </div>

      <div className="space-y-4">
        {components.map((component) => {
          const IconComponent = component.icon;
          return (
            <div 
              key={component.name}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-2 rounded-lg bg-muted">
                    <IconComponent className="w-5 h-5 text-foreground" />
                  </div>
                  <div 
                    className={`absolute -top-1 -right-1 ${getStatusDot(component.status)}`}
                  />
                </div>
                <div>
                  <div className="font-medium text-foreground">{component.name}</div>
                  <div className="text-sm text-muted-foreground">{component.ip}</div>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant={getStatusColor(component.status) as any} className="mb-1">
                  {component.status.toUpperCase()}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {component.lastHeartbeat}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SystemStatus;