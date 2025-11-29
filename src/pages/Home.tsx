import { Link } from "react-router-dom";
import { Phone, MessageCircle, CheckCircle, Clock, Shield, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestimonialCard } from "@/components/TestimonialCard";
import { CONTACT_INFO } from "@/config/contact";
import { testimonials } from "@/data/staticData";
import { getFeaturedServices, getServiceOverview } from "@/data/servicesData";
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

  const homeTestimonials = testimonials.filter(t => t.show_on_home);
  const featuredServices = getFeaturedServices();
  const serviceOverview = getServiceOverview();

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
                        {service.highlight}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{service.customers} served</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <span>{service.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                      <span className="text-xs text-muted-foreground">onwards</span>
                    </div>
                    <ul className="space-y-1.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 pt-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link to="/contact">Book Now</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5"
                        onClick={() => {
                          const message = encodeURIComponent(`Hi! I'm interested in ${service.name}. Please provide more details.`);
                          window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
                        }}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Ask
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-accent">
        <div className="container-narrow">
          <div ref={servicesRef.ref} className={`scroll-animate ${servicesRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-2">Complete AC Solutions</h2>
            <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
              From installation to repair, we handle all your air conditioning needs with professional expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {serviceOverview.map((item, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{item.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  <p className="text-primary font-semibold text-sm">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/services">View All Services & Pricing</Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Transparent pricing • Detailed breakdowns • No hidden charges
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
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
      <section className="section-padding bg-accent">
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
      <section className="section-padding">
        <div className="container-wide">
          <div ref={testimonialsRef.ref} className={`scroll-animate ${testimonialsRef.isVisible ? 'visible' : ''}`}>
            <h2 className="text-center mb-8">What Our Customers Say</h2>
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
            {homeTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  rating={testimonial.rating}
                  review={testimonial.review_text}
                  city={testimonial.city || undefined}
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <a 
                href="https://www.google.com/search?q=comfort+technical+services+pune" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View All Reviews on Google
              </a>
            </Button>
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
