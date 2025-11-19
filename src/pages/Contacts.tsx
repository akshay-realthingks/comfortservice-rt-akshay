import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone } from "lucide-react";

const Contacts = () => {
  const contacts = [
    { id: 1, name: "John Smith", email: "john@acmecorp.com", company: "Acme Corp", phone: "+1 555-0101", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@techstart.io", company: "TechStart", phone: "+1 555-0102", status: "active" },
    { id: 3, name: "Mike Brown", email: "mike@globalco.com", company: "GlobalCo", phone: "+1 555-0103", status: "lead" },
    { id: 4, name: "Emily Davis", email: "emily@innovate.com", company: "Innovate Inc", phone: "+1 555-0104", status: "active" },
    { id: 5, name: "David Wilson", email: "david@startup.com", company: "Startup Labs", phone: "+1 555-0105", status: "inactive" },
  ];

  const statusColors = {
    active: "bg-success/10 text-success",
    lead: "bg-warning/10 text-warning",
    inactive: "bg-muted text-muted-foreground",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
            <p className="text-muted-foreground mt-1">Manage your customer relationships</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="flex-1"
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{contact.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[contact.status as keyof typeof statusColors]}>
                          {contact.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;
