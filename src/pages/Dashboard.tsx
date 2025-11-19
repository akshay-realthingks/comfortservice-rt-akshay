import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Users, DollarSign, Briefcase, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const recentDeals = [
    { id: 1, name: "Enterprise Deal - Acme Corp", value: "$125,000", status: "negotiation", contact: "John Smith" },
    { id: 2, name: "SaaS Subscription - TechStart", value: "$45,000", status: "proposal", contact: "Sarah Johnson" },
    { id: 3, name: "Consulting Services - GlobalCo", value: "$80,000", status: "closed-won", contact: "Mike Brown" },
  ];

  const statusColors = {
    negotiation: "bg-warning/10 text-warning",
    proposal: "bg-primary/10 text-primary",
    "closed-won": "bg-success/10 text-success",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your business overview.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Contacts"
            value="2,847"
            change="+12% from last month"
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Active Deals"
            value="124"
            change="+8% from last month"
            changeType="positive"
            icon={Briefcase}
          />
          <MetricCard
            title="Revenue (MTD)"
            value="$847,392"
            change="+23% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Win Rate"
            value="64%"
            change="+5% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{deal.name}</p>
                    <p className="text-sm text-muted-foreground">{deal.contact}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-lg">{deal.value}</p>
                    <Badge className={statusColors[deal.status as keyof typeof statusColors]}>
                      {deal.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
