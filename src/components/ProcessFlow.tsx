import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Scan, 
  Brain, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Play,
  Timer,
  Camera
} from "lucide-react";

const ProcessFlow = () => {
  const steps = [
    {
      id: 1,
      title: "Part Detection",
      description: "DI_Sensor detects part",
      icon: Scan,
      status: "active",
      details: "Physical sensor triggers"
    },
    {
      id: 2,
      title: "Camera Trigger",
      description: "DO_CamTrig + PC_Request",
      icon: Camera,
      status: "processing",
      details: "120ms lookback buffer"
    },
    {
      id: 3,
      title: "AI Analysis",
      description: "YOLO model processing",
      icon: Brain,
      status: "pending",
      details: "2448x2048px, SAHI slicing"
    },
    {
      id: 4,
      title: "Result & Action",
      description: "Conveyor control",
      icon: CheckCircle,
      status: "waiting",
      details: "OK/NOK determination"
    }
  ];

  const getStepColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "processing": return "warning";
      case "pending": return "primary";
      case "waiting": return "secondary";
      default: return "muted";
    }
  };

  const getStepIcon = (status: string) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center";
    switch (status) {
      case "active": 
        return `${baseClasses} bg-success/20 border-2 border-success animate-pulse`;
      case "processing": 
        return `${baseClasses} bg-warning/20 border-2 border-warning animate-spin`;
      case "pending": 
        return `${baseClasses} bg-primary/20 border-2 border-primary`;
      case "waiting": 
        return `${baseClasses} bg-secondary border-2 border-border`;
      default: 
        return `${baseClasses} bg-muted border-2 border-border`;
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-accent/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
          <Play className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Process Flow</h3>
          <p className="text-sm text-muted-foreground">Real-time quality control pipeline</p>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="relative">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className={getStepIcon(step.status)}>
                    <IconComponent className="w-4 h-4 text-current" />
                  </div>
                  {!isLast && (
                    <div className="absolute top-8 left-4 w-0.5 h-8 bg-border" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{step.title}</h4>
                    <Badge variant={getStepColor(step.status) as any} className="text-xs">
                      {step.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                  <p className="text-xs text-muted-foreground/70">{step.details}</p>
                </div>

                {!isLast && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Process Statistics */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">99.2%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">847</div>
            <div className="text-xs text-muted-foreground">Parts/Hour</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">2.1%</div>
            <div className="text-xs text-muted-foreground">Defect Rate</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProcessFlow;