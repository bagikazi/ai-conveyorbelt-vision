import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Package
} from "lucide-react";

const LiveMetrics = () => {
  const metrics = [
    {
      title: "Production Rate",
      value: "847",
      unit: "parts/hr",
      trend: "+5.2%",
      icon: TrendingUp,
      color: "success",
      status: "optimal"
    },
    {
      title: "Quality Rate",
      value: "97.9%",
      unit: "pass rate",
      trend: "+0.3%",
      icon: CheckCircle,
      color: "success",
      status: "excellent"
    },
    {
      title: "Defect Detection",
      value: "18",
      unit: "rejected",
      trend: "-2.1%",
      icon: AlertTriangle,
      color: "warning",
      status: "normal"
    },
    {
      title: "Average Cycle Time",
      value: "4.2s",
      unit: "per part",
      trend: "-0.1s",
      icon: Clock,
      color: "primary",
      status: "optimized"
    }
  ];

  const recentActivity = [
    { time: "14:23:45", event: "Part OK - Conveyor Continue", type: "success" },
    { time: "14:23:41", event: "AI Analysis Complete - 0.3s", type: "info" },
    { time: "14:23:38", event: "Defect Detected - Conveyor Stop", type: "warning" },
    { time: "14:23:35", event: "Operator Reset - System Resume", type: "success" },
    { time: "14:23:31", event: "Part Detection Triggered", type: "info" }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "success": return "text-success border-success/20 bg-success/10";
      case "warning": return "text-warning border-warning/20 bg-warning/10";
      case "primary": return "text-primary border-primary/20 bg-primary/10";
      default: return "text-muted-foreground border-border bg-muted/10";
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success": return "success";
      case "warning": return "warning";
      case "info": return "primary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card 
              key={metric.title}
              className="p-4 bg-gradient-to-br from-card to-secondary/20 border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg border ${getColorClasses(metric.color)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <Badge variant={metric.color as any} className="text-xs">
                  {metric.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">{metric.title}</div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{metric.unit}</span>
                  <span className={`text-xs font-medium ${
                    metric.trend.startsWith('+') ? 'text-success' : 
                    metric.trend.startsWith('-') && metric.title.includes('Defect') ? 'text-success' :
                    metric.trend.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Log */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Activity Log</h3>
            <p className="text-sm text-muted-foreground">Real-time process events</p>
          </div>
        </div>

        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge variant={getActivityColor(activity.type) as any} className="text-xs min-w-fit">
                  {activity.time}
                </Badge>
                <span className="text-sm text-foreground">{activity.event}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LiveMetrics;