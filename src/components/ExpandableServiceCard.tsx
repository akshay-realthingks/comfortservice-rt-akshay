import { useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/config/contact";
import { cn } from "@/lib/utils";

interface ExpandableServiceCardProps {
  category: string;
  name: string;
  description: string;
  priceLabel: string;
  covered?: string[];
}

export const ExpandableServiceCard = ({
  category,
  name,
  description,
  priceLabel,
  covered = []
}: ExpandableServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'd like to know more about ${name}.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div
      className={cn(
        "group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 ease-out",
        "hover:shadow-md hover:-translate-y-0.5",
        isExpanded && "shadow-md -translate-y-0.5"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Collapsed Content - Always Visible */}
      <div className="p-3.5">
        {/* Category Badge */}
        <span className="inline-block text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {category}
        </span>

        {/* Service Name & Price */}
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-sm font-semibold leading-tight flex-1">{name}</h3>
          <span className="text-sm font-bold text-primary whitespace-nowrap">{priceLabel}</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{description}</p>

        {/* CTAs */}
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1 h-8 text-xs">
            <Link to="/contact" onClick={(e) => e.stopPropagation()}>
              Book Now
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              handleWhatsApp();
            }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-xs">WhatsApp</span>
          </Button>
        </div>

        {/* Expand Indicator */}
        {covered.length > 0 && (
          <div className="flex justify-center mt-2">
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </div>
        )}
      </div>

      {/* Expanded Content - Slides Down on Hover/Tap */}
      {covered.length > 0 && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-3.5 pb-3.5 pt-0 border-t border-border/50">
            <p className="text-[11px] font-medium text-foreground mb-2 mt-2.5">What's Covered:</p>
            <ul className="space-y-1.5">
              {covered.map((item, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
