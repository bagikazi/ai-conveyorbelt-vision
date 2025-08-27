import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Zap, Eye, Clock, Target } from "lucide-react";

const ConfigurationPanel = () => {
  const configurations = [
    {
      category: "Communication",
      icon: Zap,
      settings: [
        { name: "PC Heartbeat Interval", value: "0.30s", status: "active" },
        { name: "PLC Manual Control", value: "D110.01", status: "ready" },
        { name: "PC_Request Polling", value: "Rising Edge", status: "active" }
      ]
    },
    {
      category: "Vision System",
      icon: Eye,
      settings: [
        { name: "Image Resolution", value: "2448x2048px", status: "optimal" },
        { name: "Confidence Threshold", value: "0.30", status: "active" },
        { name: "NMS IOU Threshold", value: "0.50", status: "active" }
      ]
    },
    {
      category: "Processing",
      icon: Target,
      settings: [
        { name: "SAHI Slice Size", value: "768x768px", status: "active" },
        { name: "Slice Overlap", value: "5%", status: "optimal" },
        { name: "Trigger Lookback", value: "120ms", status: "calibrated" }
      ]
    },
    {
      category: "Timing",
      icon: Clock,
      settings: [
        { name: "Result Pulse Duration", value: "60ms", status: "active" },
        { name: "Wait Timer Timeout", value: "Auto", status: "ready" },
        { name: "Conveyor Speed", value: "Normal", status: "running" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "running": return "success";
      case "optimal": case "calibrated": return "primary";
      case "ready": return "warning";
      default: return "secondary";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Configuration</h3>
          <p className="text-sm text-muted-foreground">Current operational parameters</p>
        </div>
      </div>

      <div className="space-y-6">
        {configurations.map((config) => {
          const IconComponent = config.icon;
          return (
            <div key={config.category} className="space-y-3">
              <div className="flex items-center gap-2">
                <IconComponent className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-foreground">{config.category}</h4>
              </div>
              
              <div className="space-y-2">
                {config.settings.map((setting) => (
                  <div 
                    key={setting.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{setting.name}</div>
                      <div className="text-xs text-muted-foreground">{setting.value}</div>
                    </div>
                    <Badge 
                      variant={getStatusColor(setting.status) as any}
                      className="text-xs"
                    >
                      {setting.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="text-sm font-medium text-foreground mb-3">Quick Actions</div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary/50">
            Manual Conveyor Control
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-accent/10 hover:border-accent/50">
            Calibrate Camera
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-success/10 hover:border-success/50">
            Reset Counters
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default ConfigurationPanel;