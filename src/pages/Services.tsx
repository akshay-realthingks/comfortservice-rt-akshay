import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/config/contact";

const Services = () => {
  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h1 className="mb-2">Our AC Services</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Comprehensive air conditioning services for homes and offices in Pune & PCMC.
            All services come with warranty and professional support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              description={service.description}
              startingPrice={service.startingPrice}
            />
          ))}
        </div>

        <div className="mt-10 bg-accent rounded-lg p-6 text-center">
          <h2 className="mb-2">Additional Services Available</h2>
          <p className="text-muted-foreground text-sm mb-2">
            We also provide specialized services including duct cleaning, thermostat installation,
            preventive maintenance, and emergency repairs. Contact us for custom requirements.
          </p>
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> Final pricing is confirmed after inspection. No work is done without your approval.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
