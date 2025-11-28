import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const dealStages = [
  {
    name: "Prospecting",
    deals: [
      { id: 1, company: "Alpha Corp", value: "$25,000", contact: "Jane Doe" },
      { id: 2, company: "Beta LLC", value: "$15,000", contact: "Tom Hardy" },
    ],
  },
  {
    name: "Proposal",
    deals: [
      { id: 3, company: "TechStart Inc", value: "$35,000", contact: "Sarah Johnson" },
    ],
  },
  {
    name: "Negotiation",
    deals: [
      { id: 4, company: "Acme Corp", value: "$50,000", contact: "John Smith" },
    ],
  },
  {
    name: "Closed Won",
    deals: [
      { id: 5, company: "Global Solutions", value: "$75,000", contact: "Mike Davis" },
    ],
  },
];

const Deals = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Deals Pipeline</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dealStages.map((stage) => (
          <Card key={stage.name}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{stage.name}</span>
                <Badge variant="secondary">{stage.deals.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stage.deals.map((deal) => (
                  <Card key={deal.id} className="p-4 bg-accent">
                    <h3 className="font-semibold text-foreground">{deal.company}</h3>
                    <p className="text-sm text-muted-foreground">{deal.contact}</p>
                    <p className="text-lg font-bold text-primary mt-2">{deal.value}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Deals;
