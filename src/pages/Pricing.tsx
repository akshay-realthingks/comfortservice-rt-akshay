import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/config/contact";

const Pricing = () => {
  const handleWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Hi! I'd like to know more about pricing for ${service}.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const pricingData = [
    {
      category: "AC Servicing",
      items: [
        { name: "Split AC - Basic Service", price: "₹399" },
        { name: "Split AC - Deep Cleaning", price: "₹799" },
        { name: "Window AC - Basic Service", price: "₹349" },
        { name: "Window AC - Deep Cleaning", price: "₹699" }
      ]
    },
    {
      category: "Installation & Uninstallation",
      items: [
        { name: "Split AC Installation", price: "₹799 - ₹1,499" },
        { name: "Window AC Installation", price: "₹599 - ₹999" },
        { name: "AC Uninstallation", price: "₹499 - ₹799" }
      ]
    },
    {
      category: "Repair & Gas Refill",
      items: [
        { name: "Gas Refilling (per 100g)", price: "₹1,499 - ₹2,499" },
        { name: "PCB Repair", price: "₹799 onwards" },
        { name: "Compressor Repair", price: "₹1,999 onwards" },
        { name: "General Troubleshooting", price: "₹299 onwards" }
      ]
    }
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h1 className="mb-2">Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Clear, upfront pricing with no hidden charges. Final price confirmed after inspection.
          </p>
        </div>

        <div className="space-y-4">
          {pricingData.map((category, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.category}</CardTitle>
                <CardDescription className="text-xs">Professional service with warranty included</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold text-sm">{item.price}</span>
                        <div className="flex gap-1">
                          <Button asChild size="sm" variant="outline" className="h-7 px-2 text-xs">
                            <Link to="/contact">Book</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => handleWhatsApp(item.name)}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-accent rounded-lg p-5">
            <h3 className="font-semibold mb-3">Pricing Notes</h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>• Prices may vary based on AC condition, location, and accessibility</li>
              <li>• Parts and materials are charged separately if needed</li>
              <li>• Free inspection for all services</li>
              <li>• No work done without your approval</li>
              <li>• All services include warranty</li>
              <li>• AMC customers get priority support and discounted rates</li>
            </ul>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
            <h3 className="font-semibold mb-3 text-primary">GST Invoice Available</h3>
            <p className="text-xs text-muted-foreground mb-3">
              We are a GST registered business and provide proper GST invoices for all services.
            </p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>• Official GST invoices for all transactions</li>
              <li>• Claim input tax credit on business expenses</li>
              <li>• Proper documentation for corporate clients</li>
              <li>• GSTIN: <span className="font-mono text-foreground">{CONTACT_INFO.gstin}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
