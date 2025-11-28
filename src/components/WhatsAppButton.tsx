import { MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/config/contact";

export const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I would like to know more about your AC services.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3.5 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
    </button>
  );
};