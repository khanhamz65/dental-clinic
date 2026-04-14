"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Contact() {
  const { toast } = useToast();
  useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="fade-in pb-24">
      {/* Hero */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&auto=format&fit=crop&q=80"
            alt="Dental clinic"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10 reveal">
          <span className="inline-block text-xs font-bold tracking-widest text-white/60 uppercase mb-4 border border-white/20 px-3 py-1 rounded-full">Get In Touch</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 font-serif text-white">
            We'd Love to{" "}
            <span className="italic font-normal text-white/85">Hear From You</span>
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about our services, pricing, or want to schedule a visit — our team is ready to help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div className="space-y-8 reveal-left">
              <h2 className="text-3xl font-bold font-serif mb-8">Get in Touch</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: MapPin, title: "Visit Us", content: "123 Luminous Ave, Suite 400\nSan Francisco, CA 94107" },
                  { icon: Phone, title: "Call Us", content: "(000) 123-4567\nEmergency: (000) 123-4567" },
                  { icon: Mail, title: "Email Us", content: "hello@brightsmile.com\nbooking@brightsmile.com" },
                  { icon: Clock, title: "Office Hours", content: "Mon–Thu: 8am – 6pm\nFri: 8am – 4pm | Sat: 9am – 2pm" },
                ].map(({ icon: Icon, title, content }, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-base mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{content}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <span className="font-medium text-foreground">Follow us:</span>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              {/* Map Embed */}
              <div className="h-64 rounded-3xl overflow-hidden bg-muted relative shadow-lg mt-8 border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5!2d-122.3960!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBrightSmile%20Dental!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Form */}
            <div className="reveal-right">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-border/60 shadow-md">
                <h3 className="text-2xl font-bold font-serif mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="h-12 bg-secondary/50 border-transparent focus:border-primary rounded-xl" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="h-12 bg-secondary/50 border-transparent focus:border-primary rounded-xl" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required className="h-12 bg-secondary/50 border-transparent focus:border-primary rounded-xl" placeholder="jane@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" required className="h-12 bg-secondary/50 border-transparent focus:border-primary rounded-xl" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" required className="min-h-[150px] bg-secondary/50 border-transparent focus:border-primary rounded-xl resize-none" placeholder="Your message here..." />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 rounded-full text-lg font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find quick answers to common questions about our practice.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border py-2">
              <AccordionTrigger className="text-lg font-medium hover:text-primary hover:no-underline">
                Do you accept dental insurance?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Yes, we accept most major PPO dental insurance plans. Our front desk team will happily verify your benefits before your appointment and handle all claim submissions on your behalf to ensure you maximize your coverage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-border py-2">
              <AccordionTrigger className="text-lg font-medium hover:text-primary hover:no-underline">
                What should I bring to my first appointment?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Please bring your valid photo ID, your dental insurance card (if applicable), and any previous dental records or x-rays if you have them. We also recommend arriving 15 minutes early to complete any necessary new patient paperwork.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-border py-2">
              <AccordionTrigger className="text-lg font-medium hover:text-primary hover:no-underline">
                Do you offer emergency dental care?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Absolutely. We reserve specific slots in our schedule each day for dental emergencies. If you are experiencing severe pain, bleeding, or have suffered a dental trauma, please call our emergency line immediately, and we will see you as soon as possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
