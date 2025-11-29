import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useServices } from "@/contexts/DataStoreContext";
import { ExpandableServiceCard } from "@/components/ExpandableServiceCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTACT_INFO } from "@/config/contact";

const Services = () => {
  const headerRef = useScrollAnimation();
  const servicesRef = useScrollAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [services] = useServices();

  // Sort services by displayOrder
  const sortedServices = [...services].sort((a, b) => a.displayOrder - b.displayOrder);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Compact Header */}
        <div ref={headerRef.ref} className={`text-center mb-8 scroll-animate ${headerRef.isVisible ? 'visible' : ''}`}>
          <h1 className="text-2xl font-bold mb-1.5">Our AC Services</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Transparent pricing for AC services in Pune & PCMC. Free inspection included.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div ref={servicesRef.ref} className={`scroll-animate ${servicesRef.isVisible ? 'visible' : ''}`}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="h-52 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {sortedServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ExpandableServiceCard
                    category={service.category}
                    name={service.name}
                    description={service.description}
                    priceLabel={service.priceLabel}
                    covered={service.covered}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>


        {/* Additional Information - Compact */}
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <Card className="bg-accent/50 border-0">
            <CardHeader className="pb-2 pt-3 px-3.5">
              <CardTitle className="text-sm font-semibold">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="px-3.5 pb-3">
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Final pricing confirmed after free inspection</li>
                <li>• Parts & materials charged separately if needed</li>
                <li>• All services include warranty</li>
                <li>• AMC customers get priority support & discounts</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border border-primary/20">
            <CardHeader className="pb-2 pt-3 px-3.5">
              <CardTitle className="text-sm font-semibold text-primary">GST Invoice Available</CardTitle>
            </CardHeader>
            <CardContent className="px-3.5 pb-3">
              <p className="text-xs text-muted-foreground mb-1.5">
                Official GST invoices for all services.
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• GSTIN: <span className="font-mono text-foreground text-[11px]">{CONTACT_INFO.gstin}</span></li>
                <li>• Claim input tax credit on expenses</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
