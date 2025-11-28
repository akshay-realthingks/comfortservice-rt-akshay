import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/config/contact";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to know more about your AC services.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "AMC Plans", path: "/amc" },
    { name: "Areas", path: "/service-areas" },
    { name: "About", path: "/about" },
    { name: "FAQs", path: "/faqs" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-wide">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
            <img src={logo} alt={CONTACT_INFO.companyName} className="h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button onClick={handleCall} variant="ghost" size="sm" className="gap-1.5 h-8 text-sm">
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Call</span>
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="sm"
              className="gap-1.5 h-8 bg-[#25D366] hover:bg-[#20BA5A] text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-wide py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 flex gap-2 border-t border-border mt-3">
              <Button onClick={handleCall} variant="outline" size="sm" className="flex-1 gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button
                onClick={handleWhatsApp}
                size="sm"
                className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
