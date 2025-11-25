"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Facebook, Youtube } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <>
      <section className="py-24 bg-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Form */}
            <FadeIn direction="right" fullWidth className="w-full lg:w-1/2">
              <div>
                <h3 className="text-xl font-bold mb-8 uppercase tracking-wide">Contact Form:</h3>
                <form className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Your full Name" 
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-sm border-2 transition-all duration-300 outline-none bg-card text-txt-main
                        ${focusedField === 'name' ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent hover:border-primary/30'}`}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-sm border-2 transition-all duration-300 outline-none bg-card text-txt-main
                        ${focusedField === 'email' ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent hover:border-primary/30'}`}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Query Related" 
                      onFocus={() => setFocusedField('query')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-sm border-2 transition-all duration-300 outline-none bg-card text-txt-main
                        ${focusedField === 'query' ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent hover:border-primary/30'}`}
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      placeholder="Message" 
                      rows={6}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full p-4 rounded-sm border-2 transition-all duration-300 outline-none resize-none bg-card text-txt-main
                        ${focusedField === 'message' ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-transparent hover:border-primary/30'}`}
                    ></textarea>
                  </div>
                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Send Message
                  </Button>
                </form>
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn direction="left" delay={0.2} fullWidth className="w-full lg:w-1/2 lg:pl-12 pt-12">
              <div>
                <div className="mb-12">
                  <p className="text-gray-500 text-sm mb-2">Address</p>
                  <h4 className="text-xl font-bold uppercase mb-1">Victory Outreach Ministry</h4>
                  <p className="text-txt-muted text-sm">Lomé, Togo</p>
                </div>

                <div className="mb-12">
                  <p className="text-gray-500 text-sm mb-2">Contact Details</p>
                  <p className="text-txt-muted text-sm mb-2">(+228) 90 00 00 00</p>
                  <p className="text-txt-muted text-sm">info@victoryoutreach.tg</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <motion.a 
                      href="https://www.facebook.com/profile.php?id=100064183954039" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-14 h-14 flex items-center justify-center bg-card hover:bg-[#1877F2] rounded-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-[#1877F2]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: "0 0 0 rgba(24, 119, 242, 0)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(24, 119, 242, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 0 rgba(24, 119, 242, 0)";
                      }}
                    >
                      <Facebook className="w-6 h-6 text-txt-main group-hover:text-white transition-colors" />
                    </motion.a>
                    
                    <motion.a 
                      href="https://youtube.com/@egliseterredevictoiretogo?si=M5hTf8637N7HLKAj" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-14 h-14 flex items-center justify-center bg-card hover:bg-[#FF0000] rounded-full transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-[#FF0000]"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        boxShadow: "0 0 0 rgba(255, 0, 0, 0)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 0, 0, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 0 rgba(255, 0, 0, 0)";
                      }}
                    >
                      <Youtube className="w-6 h-6 text-txt-main group-hover:text-white transition-colors" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-app relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-txt-main uppercase mb-4">
                Our Location
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full shadow-lg shadow-primary/50" />
              <p className="text-txt-muted mt-4 max-w-2xl mx-auto">
                Visit us in Lomé, Togo. We welcome you to join our community.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div 
              className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-card"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "0 20px 60px -10px rgba(55, 83, 157, 0.3)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9376237434596!2d1.2113!3d6.1319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDcnNTQuOCJOIDHCsDEyJzQwLjciRQ!5e0!3m2!1sen!2stg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Overlay corners for extra style */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-secondary rounded-br-2xl pointer-events-none" />
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
