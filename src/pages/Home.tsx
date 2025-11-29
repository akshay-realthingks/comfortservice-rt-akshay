import { Phone, MessageCircle, CheckCircle, Clock, Shield, Users, Award, ThumbsUp, Building2, FileText, Rocket, Target, Star, TrendingUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TestimonialCard } from "@/components/TestimonialCard";
import { LazyImage } from "@/components/LazyImage";
import { CONTACT_INFO, SERVICES } from "@/config/contact";
import { testimonials, serviceAreas, faqItems, galleryImages } from "@/data/staticData";
import { useServices, useAmcPlans } from "@/contexts/DataStoreContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/utils/scrollToSection";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Services & AMC data
  const [services] = useServices();
  const [amcPlans] = useAmcPlans();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [lightboxImageLoading, setLightboxImageLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Contact form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    acType: "",
    units: "1",
    preferredDate: "",
    preferredTimeSlot: "",
    address: "",
    city: "",
    pincode: "",
    preferredContactMode: "Call",
    notes: ""
  });

  const homeTestimonials = testimonials.filter(t => t.show_on_home);
  
  // Get featured services
  const featuredServices = services
    .filter(s => s.showOnHome)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .slice(0, 3);

  // Get service overview by category
  const servicesData = services.reduce((acc, service) => {
    const existingCategory = acc.find(cat => cat.category === service.category);
    if (existingCategory) {
      existingCategory.items.push(service);
    } else {
      acc.push({
        category: service.category,
        description: '',
        items: [service]
      });
    }
    return acc;
  }, [] as Array<{ category: string; description: string; items: typeof services }>);

  // AMC Plans
  const activePlans = amcPlans
    .filter(plan => plan.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Service Areas
  const cities = [...new Set(serviceAreas.map((area) => area.city))];
  const filteredAreas = selectedCity
    ? serviceAreas.filter((area) => area.city === selectedCity)
    : serviceAreas;

  // About stats
  const stats = [
    { icon: Award, label: "Years Experience", value: 7, suffix: "+" },
    { icon: Users, label: "AC Units Serviced", value: 10000, suffix: "+" },
    { icon: ThumbsUp, label: "Google Reviews", value: 57, suffix: "" },
    { icon: Clock, label: "Google Rating", value: 5.0, suffix: "/5", isDecimal: true }
  ];

  const milestones = [
    { year: "2018", title: "Foundation", description: "Started Comfort Technical Services in Pune with a vision to provide reliable AC services", icon: Rocket },
    { year: "2019", title: "First 500 Customers", description: "Reached our first 500 satisfied customers and expanded service coverage across Pune", icon: Target },
    { year: "2020", title: "GST Registration", description: "Became a registered GST business, offering professional invoices to all customers", icon: FileText },
    { year: "2021", title: "PCMC Expansion", description: "Extended services to PCMC area including Akurdi, Chinchwad, and surrounding regions", icon: TrendingUp },
    { year: "2023", title: "10,000+ Services", description: "Crossed the milestone of 10,000+ AC units serviced with 5-star customer ratings", icon: Star },
    { year: "2024", title: "AMC Programs", description: "Launched comprehensive Annual Maintenance Contract programs for homes and businesses", icon: Award }
  ];

  // FAQs
  const categories = [...new Set(faqItems.map((faq) => faq.category))];
  const filteredFaqs = selectedCategory
    ? faqItems.filter((faq) => faq.category === selectedCategory)
    : faqItems;

  const amcFaqs = [
    {
      q: "What is AMC and why do I need it?",
      a: "Annual Maintenance Contract (AMC) ensures regular servicing and maintenance of your AC units, reducing breakdowns and extending equipment life. It's cost-effective for homes and offices with multiple units."
    },
    {
      q: "Can I upgrade my AMC plan later?",
      a: "Yes, you can upgrade your AMC plan at any time. The price difference will be calculated on a pro-rata basis."
    },
    {
      q: "What happens if my AC needs major repairs?",
      a: "Minor repairs are covered in Standard and Premium plans. Major repairs are provided at discounted rates for AMC customers."
    }
  ];

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleWhatsApp = (customMessage?: string) => {
    const message = encodeURIComponent(customMessage || "Hello! I would like to book an AC service.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.serviceType || !formData.acType || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    const messageParts = [
      "*New Service Booking Request*",
      "",
      `*Name:* ${encodeURIComponent(formData.name)}`,
      `*Phone:* ${encodeURIComponent(formData.phone)}`,
    ];

    if (formData.email) {
      messageParts.push(`*Email:* ${encodeURIComponent(formData.email)}`);
    }

    messageParts.push(
      `*Service:* ${encodeURIComponent(formData.serviceType)}`,
      `*AC Type:* ${encodeURIComponent(formData.acType)}`,
      `*Units:* ${encodeURIComponent(formData.units)}`
    );

    if (formData.preferredDate) {
      messageParts.push(`*Preferred Date:* ${encodeURIComponent(formData.preferredDate)}`);
    }

    if (formData.preferredTimeSlot) {
      messageParts.push(`*Time Slot:* ${encodeURIComponent(formData.preferredTimeSlot)}`);
    }

    const fullAddress = `${formData.address}, ${formData.city}${formData.pincode ? ` - ${formData.pincode}` : ''}`;
    messageParts.push(
      `*Address:* ${encodeURIComponent(fullAddress)}`,
      `*Contact Via:* ${encodeURIComponent(formData.preferredContactMode)}`
    );

    if (formData.notes) {
      messageParts.push(`*Notes:* ${encodeURIComponent(formData.notes)}`);
    }

    const message = messageParts.join("%0A");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
    
    toast.success("Opening WhatsApp... Please send the message to complete your booking request.");
    
    setFormData({
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      acType: "",
      units: "1",
      preferredDate: "",
      preferredTimeSlot: "",
      address: "",
      city: "",
      pincode: "",
      preferredContactMode: "Call",
      notes: ""
    });
  };

  // Gallery functions
  const handlePrevious = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoading(true);
    setSelectedImageIndex((prev) => 
      prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoading(true);
    setSelectedImageIndex((prev) => 
      prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  // Preload adjacent images
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const preloadImage = (index: number) => {
      if (index >= 0 && index < galleryImages.length) {
        const img = new Image();
        img.src = galleryImages[index].image_url;
      }
    };

    preloadImage(selectedImageIndex - 1);
    preloadImage(selectedImageIndex + 1);
  }, [selectedImageIndex]);

  // Keyboard navigation for gallery
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="bg-accent section-padding-sm relative overflow-hidden scroll-mt-20">
        <motion.div 
          className="container-wide relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="mb-3">Fast, Reliable AC Service in Pune & PCMC</h1>
            <p className="text-muted-foreground mb-6 text-sm">
              Same-day service • Experienced technicians • Transparent pricing • Service warranty
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => scrollToSection("contact")} size="lg">
                Book Service
              </Button>
              <Button onClick={handleCall} variant="outline" size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button
                onClick={() => handleWhatsApp()}
                size="lg"
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
      <section className="section-padding-sm scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Most Popular Services</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Our most requested services with proven results and customer satisfaction
          </p>
          
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
                      <span className="text-xl font-bold text-primary">{service.priceLabel}</span>
                    </div>
                    {service.covered && Array.isArray(service.covered) && service.covered.length > 0 && (
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
                    <Button onClick={() => scrollToSection("contact")} className="flex-1 h-9 text-sm">
                      Book Now
                    </Button>
                    <Button 
                      onClick={() => handleWhatsApp(`Hi! I'd like to know more about ${service.name}.`)}
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

      {/* Why Choose Us */}
      <section className="section-padding-sm bg-accent/50">
        <div className="container-wide">
          <h2 className="text-center mb-2">Why Choose Comfort Technical Service?</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Trusted by thousands of customers in Pune & PCMC for AC service excellence
          </p>
          
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

      {/* Services Section */}
      <section id="services" className="section-padding scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Our Services</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Comprehensive AC solutions for all your needs
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {servicesData.slice(0, 4).map((category, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <CardDescription className="text-xs">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="p-3 bg-accent/50 rounded-lg">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium block">{item.name}</span>
                              <span className="text-xs text-muted-foreground block mt-0.5">{item.description}</span>
                            </div>
                            <span className="text-primary font-semibold text-sm whitespace-nowrap">{item.priceLabel}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/All Services */}
      <section id="pricing" className="section-padding-sm bg-accent/50 scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">AC Services & Pricing</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Transparent pricing for all AC services in Pune & PCMC. No hidden charges, free inspection included.
          </p>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {servicesData.map((category, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="p-3 bg-accent/50 rounded-lg">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-medium block">{item.name}</span>
                                <span className="text-xs text-muted-foreground block mt-0.5">{item.description}</span>
                              </div>
                              <span className="text-primary font-semibold text-sm whitespace-nowrap">{item.priceLabel}</span>
                            </div>
                            
                            {item.covered && Array.isArray(item.covered) && item.covered.length > 0 && (
                              <div className="mt-1 pt-2 border-t border-border/50">
                                <span className="text-xs font-medium text-foreground block mb-1.5">What's Covered:</span>
                                <ul className="space-y-1">
                                  {item.covered.map((coveredItem, covIdx) => (
                                    <li key={covIdx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{coveredItem}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex gap-2 mt-1">
                              <Button onClick={() => scrollToSection("contact")} size="sm" className="flex-1 h-8 text-xs">
                                Book Now
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1.5"
                                onClick={() => handleWhatsApp(`Hi! I'd like to know more about ${item.name}.`)}
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span className="text-xs">Ask</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Card className="bg-accent border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Final pricing confirmed after free inspection</li>
                  <li>• Parts & materials charged separately if needed</li>
                  <li>• All services include warranty</li>
                  <li>• No work without your approval</li>
                  <li>• AMC customers get priority support & discounts</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-primary">GST Invoice Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  GST registered business providing official invoices for all services.
                </p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>• Claim input tax credit on business expenses</li>
                  <li>• Proper documentation for corporate clients</li>
                  <li>• GSTIN: <span className="font-mono text-foreground">{CONTACT_INFO.gstin}</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AMC Plans Section */}
      <section id="amc" className="section-padding scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Annual Maintenance Plans</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Keep your AC running efficiently year-round with our comprehensive AMC plans.
          </p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.12 }
              }
            }}
          >
            {activePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.4 }}
              >
                <Card className="card-hover h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="text-xs">{plan.targetCustomer}</CardDescription>
                    <div className="mt-3">
                      <span className="text-2xl font-bold text-primary">{plan.priceLabel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{plan.visitsPerYear} visits per year</p>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button onClick={() => scrollToSection("contact")} size="sm" className="flex-1">
                      Enquire Now
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleWhatsApp(`Hi! I'm interested in the ${plan.name} AMC plan. Please provide more details.`)}>
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-accent rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold mb-4">AMC Benefits</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Regular preventive maintenance</li>
                <li className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Priority scheduling for service calls</li>
                <li className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Reduced breakdown frequency</li>
              </ul>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Extended AC equipment life</li>
                <li className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Discounted repair rates</li>
                <li className="flex gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Dedicated support team</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">AMC FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              {amcFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section id="service-areas" className="section-padding-sm bg-accent/50 scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Service Areas</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            We proudly serve homes and businesses across Pune and Pimpri Chinchwad.
          </p>

          {/* City Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Button
              variant={selectedCity === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(null)}
            >
              All Areas
            </Button>
            {cities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </Button>
            ))}
          </div>

          {/* Areas List */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCity || "all"}
              className="flex flex-wrap gap-2 justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {filteredAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                >
                  <Badge variant="secondary" className="px-3 py-1.5 text-xs">
                    {area.area_name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Not Listed Section */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Don't See Your Area?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              We're constantly expanding our service coverage. Contact us on WhatsApp to check if we can serve your location.
            </p>
            <Button onClick={() => handleWhatsApp("Hi! I'd like to check if you service my area.")} className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
              <MessageCircle className="w-4 h-4" />
              Check Availability
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">About {CONTACT_INFO.companyName}</h2>
          <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">Your trusted partner for professional air conditioning services in Pune & PCMC</p>

          <div className="max-w-2xl mx-auto mb-10">
            <div className="bg-accent rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Our Story</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>{CONTACT_INFO.companyName} has been providing professional AC services in the Pune region since 2018. {CONTACT_INFO.experienceText}, delivering reliable installation, maintenance, and repair services with outstanding customer care.</p>
                <p>We place a high priority on providing outstanding customer service through prompt and dependable repairs, open communication, and affordable prices.</p>
              </div>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {stats.map((stat, index) => {
              const StatCounter = () => {
                const { count, ref } = useCountUp(stat.value, 2000);
                return (
                  <div ref={ref} className="text-2xl font-bold text-primary mb-0.5">
                    {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}{stat.suffix}
                  </div>
                );
              };

              const isGoogleStat = stat.label === "Google Reviews" || stat.label === "Google Rating";
              const content = (
                <>
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <StatCounter />
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </>
              );

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="text-center p-4 bg-card rounded-lg border border-border"
                >
                  {isGoogleStat ? (
                    <a 
                      href="https://www.google.com/search?q=comfort+technical+services+pune" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block hover:scale-105 transition-transform"
                    >
                      {content}
                    </a>
                  ) : content}
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-center mb-6">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: ThumbsUp, title: "Quality First", desc: "We never compromise on the quality of our work. Every service is performed with precision and care." },
                { icon: Users, title: "Customer Focused", desc: "Your satisfaction is our priority. We listen to your needs and provide tailored solutions." },
                { icon: Award, title: "Transparency", desc: "Honest pricing, clear communication, and no hidden charges." }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold mb-2">{value.title}</h4>
                  <p className="text-xs text-muted-foreground">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-center mb-6">Registered & Verified Business</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="text-sm font-semibold mb-1">GSTIN Registered</h4>
                <p className="text-xs text-muted-foreground font-mono">{CONTACT_INFO.gstin}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="text-sm font-semibold mb-1">PAN Verified</h4>
                <p className="text-xs text-muted-foreground font-mono">{CONTACT_INFO.pan}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="text-sm font-semibold mb-1">GST Invoices</h4>
                <p className="text-xs text-muted-foreground">Proper GST invoices provided</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="section-padding-sm bg-accent/50 scroll-mt-20">
        <div className="container-narrow">
          <h2 className="text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Find answers to common questions about our AC services
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-sm text-left py-3">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Our Work Gallery</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            See our professional AC installation, servicing, and repair work
          </p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                onClick={() => setSelectedImageIndex(index)}
              >
                <LazyImage
                  src={image.image_url}
                  alt={image.title || "AC Service"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                  <div className="p-3 text-background">
                    <h3 className="font-medium text-sm">{image.title}</h3>
                    {image.description && (
                      <p className="text-xs opacity-80">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="absolute top-4 right-4 text-background hover:text-background/70 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(null);
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 transition-colors bg-foreground/50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:text-background/70 transition-colors bg-foreground/50 rounded-full p-2 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              <motion.div 
                className="max-w-4xl max-h-[90vh] flex flex-col items-center relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {lightboxImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border-4 border-background/30 border-t-background rounded-full animate-spin" />
                  </div>
                )}
                <motion.img
                  key={selectedImage.image_url}
                  src={selectedImage.image_url}
                  alt={selectedImage.title || "Gallery Image"}
                  className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 ${
                    lightboxImageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: lightboxImageLoading ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  onLoad={() => setLightboxImageLoading(false)}
                />
                <div className="text-background mt-3 text-center">
                  <p className="text-sm font-medium">{selectedImage.title}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {selectedImageIndex !== null && `${selectedImageIndex + 1} / ${galleryImages.length}`}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Testimonials */}
      <section className="section-padding-sm bg-accent/50">
        <div className="container-wide">
          <h2 className="text-center mb-2">What Our Customers Say</h2>
          <p className="text-center text-muted-foreground text-sm mb-6 max-w-xl mx-auto">
            Real feedback from satisfied customers
          </p>
          
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

      {/* Contact Section */}
      <section id="contact" className="section-padding scroll-mt-20">
        <div className="container-wide">
          <h2 className="text-center mb-2">Contact Us & Book Service</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Get in touch or book your AC service online
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Get In Touch</CardTitle>
                  <CardDescription className="text-xs">Reach us through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-xs text-primary hover:underline block">
                        {CONTACT_INFO.phone}
                      </a>
                      {CONTACT_INFO.phone2 && (
                        <a href={`tel:${CONTACT_INFO.phone2}`} className="text-xs text-primary hover:underline block">
                          {CONTACT_INFO.phone2}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">WhatsApp</p>
                      <button onClick={() => handleWhatsApp()} className="text-xs text-primary hover:underline">
                        Chat on WhatsApp
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Working Hours</p>
                      <p className="text-xs text-muted-foreground">{CONTACT_INFO.workingHours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Enquiry</CardTitle>
                  <CardDescription className="text-xs">Prefer WhatsApp?</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    For quick questions or immediate assistance, reach us on WhatsApp.
                  </p>
                  <Button onClick={() => handleWhatsApp()} className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white">
                    <MessageCircle className="w-4 h-4" />
                    Open WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Book a Service</CardTitle>
                <CardDescription className="text-xs">Fill in the details and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-xs">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-xs">Mobile Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit number"
                      required
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-xs">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-xs">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="acType" className="text-xs">AC Type *</Label>
                      <Select value={formData.acType} onValueChange={(value) => setFormData({ ...formData, acType: value })}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Split">Split AC</SelectItem>
                          <SelectItem value="Window">Window AC</SelectItem>
                          <SelectItem value="Cassette">Cassette AC</SelectItem>
                          <SelectItem value="Central">Central AC</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="units" className="text-xs">Number of Units *</Label>
                      <Input
                        id="units"
                        type="number"
                        min="1"
                        value={formData.units}
                        onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="preferredDate" className="text-xs">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTimeSlot" className="text-xs">Time Slot</Label>
                      <Select value={formData.preferredTimeSlot} onValueChange={(value) => setFormData({ ...formData, preferredTimeSlot: value })}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="Afternoon">Afternoon (12PM - 4PM)</SelectItem>
                          <SelectItem value="Evening">Evening (4PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-xs">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Full address with landmarks"
                      required
                      className="min-h-[60px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="city" className="text-xs">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g., Pune"
                        required
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-xs">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="6-digit pincode"
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="preferredContactMode" className="text-xs">Preferred Contact Mode *</Label>
                    <Select value={formData.preferredContactMode} onValueChange={(value) => setFormData({ ...formData, preferredContactMode: value })}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Call">Phone Call</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-xs">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific requirements or issues..."
                      className="min-h-[60px]"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    This will open WhatsApp with your booking details pre-filled
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding-sm bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="mb-3">Ready to Get Started?</h2>
          <p className="mb-6 text-primary-foreground/90 text-sm">
            Book your AC service today and experience the difference
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => scrollToSection("contact")} size="lg" variant="secondary">
              Book Service
            </Button>
            <Button 
              onClick={() => handleWhatsApp()}
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
