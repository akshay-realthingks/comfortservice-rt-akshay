import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockContacts = [
  { id: 1, name: "John Smith", email: "john@acme.com", company: "Acme Corp", phone: "+1 234-567-8901" },
  { id: 2, name: "Sarah Johnson", email: "sarah@techstart.com", company: "TechStart Inc", phone: "+1 234-567-8902" },
  { id: 3, name: "Mike Davis", email: "mike@global.com", company: "Global Solutions", phone: "+1 234-567-8903" },
  { id: 4, name: "Emily Brown", email: "emily@innovate.com", company: "Innovate Labs", phone: "+1 234-567-8904" },
  { id: 5, name: "David Wilson", email: "david@venture.com", company: "Venture Co", phone: "+1 234-567-8905" },
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-foreground">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">{contact.email}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
