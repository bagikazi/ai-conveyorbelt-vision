import { useState, useEffect } from "react";
import SystemStatus from "@/components/SystemStatus";
import ProcessFlow from "@/components/ProcessFlow";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import LiveMetrics from "@/components/LiveMetrics";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Shield, 
  Zap, 
  PlayCircle,
  PauseCircle,
  RotateCcw
} from "lucide-react";

const Index = () => {
  const [systemTime, setSystemTime] = useState(new Date());
  const [isSystemRunning, setIsSystemRunning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Quality Control System</h1>
                <p className="text-sm text-muted-foreground">Automated AI-Powered Defect Detection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {systemTime.toLocaleTimeString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {systemTime.toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant={isSystemRunning ? "success" : "destructive"}
                  className="animate-pulse"
                >
                  {isSystemRunning ? (
                    <>
                      <PlayCircle className="w-3 h-3 mr-1" />
                      RUNNING
                    </>
                  ) : (
                    <>
                      <PauseCircle className="w-3 h-3 mr-1" />
                      STOPPED
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - System Status & Process Flow */}
          <div className="xl:col-span-2 space-y-8">
            {/* Live Metrics */}
            <LiveMetrics />
            
            {/* System Status */}
            <SystemStatus />
          </div>

          {/* Right Column - Process Flow & Configuration */}
          <div className="space-y-8">
            <ProcessFlow />
            <ConfigurationPanel />
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">System Performance</h3>
                <p className="text-sm text-muted-foreground">Optimal operation detected</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-semibold text-foreground">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">AI model accuracy: 99.1%</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-semibold text-foreground">System Configuration</h3>
                <p className="text-sm text-muted-foreground">All parameters nominal</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
