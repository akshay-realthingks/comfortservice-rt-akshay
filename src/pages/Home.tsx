import { Link } from "react-router-dom";
import { Phone, MessageCircle, CheckCircle, Clock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CONTACT_INFO, SERVICES } from "@/config/contact";
import { testimonials } from "@/data/staticData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  const servicesRef = useScrollAnimation();
  const whyUsRef = useScrollAnimation();
  const processRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to book an AC service.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const homeTestimonials = testimonials.filter(t => t.show_on_home);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-accent section-padding">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="mb-3">Fast, Reliable AC Service in Pune & PCMC</h1>
            <p className="text-muted-foreground mb-6">
              Same-day service • Experienced technicians • Transparent pricing • Service warranty
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Book Service</Link>
              </Button>
              <Button onClick={handleCall} variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button
                onClick={handleWhatsApp}
                className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="section-padding">
        <div className="container-wide">
          <div ref={servicesRef.ref} className={`scroll-animate ${servicesRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-8">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                description={service.description}
                startingPrice={service.startingPrice}
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-accent">
        <div className="container-wide">
          <div ref={whyUsRef.ref} className={`scroll-animate ${whyUsRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-8">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Users,
                title: "Experienced Team",
                desc: CONTACT_INFO.experienceText
              },
              {
                icon: Clock,
                title: "On-Time Service",
                desc: "Same-day and next-day appointments available"
              },
              {
                icon: CheckCircle,
                title: "Transparent Pricing",
                desc: "Clear quotes before work, no hidden charges"
              },
              {
                icon: Shield,
                title: "Service Warranty",
                desc: "Quality guaranteed with service warranty"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="container-narrow">
          <div ref={processRef.ref} className={`scroll-animate ${processRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-8">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Book Online or Call", desc: "Schedule via website or phone" },
              { step: "2", title: "Technician Visits", desc: "Expert arrives at your location" },
              { step: "3", title: "Diagnosis & Quote", desc: "Issue identified, quote provided" },
              { step: "4", title: "Service Complete", desc: "Work done efficiently & cleanly" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-accent">
        <div className="container-wide">
          <div ref={testimonialsRef.ref} className={`scroll-animate ${testimonialsRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-8">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {homeTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                rating={testimonial.rating}
                review={testimonial.review_text}
                city={testimonial.city || undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-sm bg-primary text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="text-primary-foreground mb-2">Ready to Book Your AC Service?</h2>
          <p className="mb-6 opacity-90 text-sm">
            Get fast, professional service today. Call or WhatsApp us now!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary">
              <Link to="/contact">Book Now</Link>
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
