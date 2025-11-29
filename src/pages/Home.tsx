import { Link } from "react-router-dom";
import { Phone, MessageCircle, CheckCircle, Clock, Shield, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CONTACT_INFO } from "@/config/contact";
import { testimonials } from "@/data/staticData";
import { useServices } from "@/contexts/DataStoreContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const featuredRef = useScrollAnimation();
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

  const [services] = useServices();
  const homeTestimonials = testimonials.filter(t => t.show_on_home);
  
  // Get featured services (showOnHome = true)
  const featuredServices = services
    .filter(s => s.showOnHome)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 3);
  
  // Get service overview by category
  const serviceOverview = [
    { label: "AC Servicing", desc: "Regular maintenance & deep cleaning", 
      price: `From ${services.find(s => s.category === 'AC Servicing')?.priceLabel || '₹349'}` },
    { label: "Installation", desc: "Professional setup for all AC types", 
      price: `From ${services.find(s => s.category === 'Installation & Uninstallation')?.priceLabel || '₹599'}` },
    { label: "Repairs", desc: "Fast troubleshooting & gas refill", 
      price: `From ${services.find(s => s.category === 'Repair & Gas Refill')?.priceLabel || '₹299'}` },
    { label: "AMC Plans", desc: "Annual contracts with priority support", price: "From ₹2,999" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-accent section-padding relative overflow-hidden">
        <motion.div 
          className="container-wide relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
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
        </motion.div>
      </section>

      {/* Featured Services */}
      <section className="section-padding">
        <div className="container-wide">
          <div ref={featuredRef.ref} className={`scroll-animate ${featuredRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-2">Most Popular Services</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              Our most requested services with proven results and customer satisfaction
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-base leading-tight">{service.name}</CardTitle>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                        Popular
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{service.priceLabel}</span>
                    </div>
                    {service.covered && service.covered.length > 0 && (
                      <ul className="space-y-1.5">
                        {service.covered.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button asChild className="flex-1 h-9 text-sm">
                      <Link to="/contact">Book Now</Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        const message = encodeURIComponent(`Hi! I'd like to know more about ${service.name}.`);
                        window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
                      }}
                      variant="outline"
                      className="h-9"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Complete AC Solutions */}
      <section className="section-padding bg-accent/50">
        <div className="container-wide">
          <div ref={servicesRef.ref} className={`scroll-animate ${servicesRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-2">Complete AC Solutions</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              From installation to maintenance, we handle all your AC needs
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {serviceOverview.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <Card className="text-center h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{service.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">{service.desc}</p>
                    <p className="text-primary font-semibold">{service.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-wide">
          <div ref={whyUsRef.ref} className={`scroll-animate ${whyUsRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-2">Why Choose Comfort Technical Service?</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              Trusted by thousands of customers in Pune & PCMC for AC service excellence
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {[
              { icon: Clock, title: "Same-Day Service", desc: "Quick response for urgent repairs" },
              { icon: Shield, title: "Warranty Assured", desc: "Service warranty on all work" },
              { icon: Users, title: "Expert Team", desc: "Certified and experienced technicians" },
              { icon: TrendingUp, title: "Best Rates", desc: "Transparent, competitive pricing" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <Card className="text-center card-hover h-full">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-accent/50">
        <div className="container-wide">
          <div ref={processRef.ref} className={`scroll-animate ${processRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-2">How It Works</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              Simple steps to get your AC serviced
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Book Service", desc: "Call, WhatsApp or book online" },
              { step: "2", title: "Schedule Visit", desc: "Choose convenient time slot" },
              { step: "3", title: "Expert Service", desc: "Professional AC technician visits" },
              { step: "4", title: "Quality Check", desc: "Testing and warranty assured" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide">
          <div ref={testimonialsRef.ref} className={`scroll-animate ${testimonialsRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-2">What Our Customers Say</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              Real feedback from satisfied customers
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {homeTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard {...testimonial} review={testimonial.review_text} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="mb-3">Ready to Get Started?</h2>
          <p className="mb-6 text-primary-foreground/90">
            Book your AC service today and experience the difference
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Book Service</Link>
            </Button>
            <Button 
              onClick={handleWhatsApp}
              size="lg" 
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
