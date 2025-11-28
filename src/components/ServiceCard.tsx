import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/config/contact";

interface ServiceCardProps {
  name: string;
  description: string;
  startingPrice: string;
}

export const ServiceCard = ({ name, description, startingPrice }: ServiceCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in ${name}. Please provide more details.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <p className="text-xl font-bold text-primary">
          {startingPrice}
          {startingPrice.includes("₹") && (
            <span className="text-xs font-normal text-muted-foreground ml-1">onwards</span>
          )}
        </p>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button asChild size="sm" className="flex-1">
          <Link to="/contact">Book Now</Link>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleWhatsApp}>
          <MessageCircle className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
