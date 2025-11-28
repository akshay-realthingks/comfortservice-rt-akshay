import { MetricCard } from "@/components/MetricCard";
import { Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockDeals = [
  { id: 1, company: "Acme Corp", value: "$50,000", stage: "Negotiation", contact: "John Smith" },
  { id: 2, company: "TechStart Inc", value: "$35,000", stage: "Proposal", contact: "Sarah Johnson" },
  { id: 3, company: "Global Solutions", value: "$75,000", stage: "Closed Won", contact: "Mike Davis" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Contacts"
          value="1,284"
          icon={Users}
          trend="+12% from last month"
        />
        <MetricCard
          title="Active Deals"
          value="43"
          icon={DollarSign}
          trend="+8% from last month"
        />
        <MetricCard
          title="Revenue"
          value="$127.5K"
          icon={TrendingUp}
          trend="+23% from last month"
        />
        <MetricCard
          title="Tasks Completed"
          value="89"
          icon={CheckCircle}
          trend="+5% from last week"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{deal.company}</p>
                  <p className="text-sm text-muted-foreground">{deal.contact}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{deal.value}</p>
                  <p className="text-sm text-muted-foreground">{deal.stage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
