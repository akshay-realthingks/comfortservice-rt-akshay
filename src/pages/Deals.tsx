import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign } from "lucide-react";

const Deals = () => {
  const pipeline = {
    lead: [
      { id: 1, name: "Website Redesign", company: "TechCo", value: "$25,000", contact: "Alice Chen" },
      { id: 2, name: "Marketing Campaign", company: "RetailHub", value: "$15,000", contact: "Bob Martinez" },
    ],
    qualified: [
      { id: 3, name: "ERP Implementation", company: "ManufactureCo", value: "$150,000", contact: "Carol White" },
    ],
    proposal: [
      { id: 4, name: "SaaS Subscription", company: "TechStart", value: "$45,000", contact: "Sarah Johnson" },
      { id: 5, name: "Cloud Migration", company: "DataCorp", value: "$95,000", contact: "Tom Anderson" },
    ],
    negotiation: [
      { id: 6, name: "Enterprise Deal", company: "Acme Corp", value: "$125,000", contact: "John Smith" },
    ],
  };

  const stages = [
    { key: "lead", title: "Lead", color: "text-muted-foreground" },
    { key: "qualified", title: "Qualified", color: "text-primary" },
    { key: "proposal", title: "Proposal", color: "text-warning" },
    { key: "negotiation", title: "Negotiation", color: "text-success" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
            <p className="text-muted-foreground mt-1">Track your sales opportunities</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Deal
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => {
            const deals = pipeline[stage.key as keyof typeof pipeline];
            const totalValue = deals.reduce((sum, deal) => {
              return sum + parseInt(deal.value.replace(/[^0-9]/g, ''));
            }, 0);

            return (
              <Card key={stage.key} className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${stage.color}`}>
                    {stage.title}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({deals.length})
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>${(totalValue / 1000).toFixed(0)}k</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  {deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="space-y-2">
                        <p className="font-medium text-sm">{deal.name}</p>
                        <p className="text-xs text-muted-foreground">{deal.company}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {deal.contact}
                          </Badge>
                          <span className="font-semibold text-sm">{deal.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Deals;
