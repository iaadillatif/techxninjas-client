import React, { useEffect, useState, useRef } from "react";
import { Testimonial } from "../types";
import { useInView } from "react-intersection-observer";

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
  speed?: number;
  className?: string;
}

const TestimonialsMarquee: React.FC<TestimonialsMarqueeProps> = ({
  testimonials,
  speed = 30,
  className = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Set mounted state after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  if (!isMounted || testimonials.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        ref={marqueeRef}
        className="flex marquee-container"
        style={{
          animation: inView 
            ? `marquee ${(testimonials.length * 400) / speed}s linear infinite` 
            : 'none',
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 mx-4 w-80 sm:w-96"
          >
            <div className="bg-brand-off-white dark:bg-brand-dark-gray p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 min-h-[340px] h-full w-full">
              <img
                src={
                  testimonial.avatarUrl ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    testimonial.name
                  )}&background=random&color=fff&size=96`
                }
                alt={testimonial.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 shadow-md"
              />
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic text-sm sm:text-base">
                "{testimonial.review}"
              </p>
              <div className="mt-auto">
                <h4 className="font-semibold text-brand-primary dark:text-brand-ninja-gold text-sm sm:text-base">
                  {testimonial.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default TestimonialsMarquee;
