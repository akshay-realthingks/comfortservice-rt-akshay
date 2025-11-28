import { useState } from "react";
import { X } from "lucide-react";
import { galleryImages } from "@/data/staticData";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  return (
    <div className="min-h-screen section-padding">
      <div className="container-wide">
        <div className="text-center mb-8">
          <h1 className="mb-2">Our Work Gallery</h1>
          <p className="text-muted-foreground text-sm">
            See our professional AC installation, servicing, and repair work
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
                onClick={() => setSelectedImage({ url: image.image_url, title: image.title || "Gallery Image" })}
              >
                <img
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
              </div>
            ))}
          </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-background hover:text-background/70 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-3xl max-h-[90vh] flex flex-col items-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-background mt-3 text-center text-sm">{selectedImage.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
