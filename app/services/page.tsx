"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Smile, Sparkles, AlignCenter, Layers, Diamond, Crown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Image from "next/image";

const SERVICES = [
  {
    title: "Comprehensive Exams & Cleaning",
    desc: "Thorough checkups, professional cleanings, oral cancer screenings, and digital x-rays to maintain your optimal dental health.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=80",
    category: "Preventive",
    categoryColor: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Smile,
    price: "From $149",
    includes: ["Full exam & x-rays", "Professional polish", "Oral cancer screening"],
  },
  {
    title: "Professional Whitening",
    desc: "Safely and effectively brighten your smile by several shades in just one visit with our advanced laser whitening technology.",
    img: "/Professional Whitening.jpg",
    category: "Cosmetic",
    categoryColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Sparkles,
    price: "From $299",
    includes: ["Custom whitening trays", "Take-home kit included", "Results in 1 visit"],
  },
  {
    title: "Invisalign® Clear Aligners",
    desc: "Straighten your teeth discreetly with custom-made, virtually invisible aligners that are comfortable and removable.",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&auto=format&fit=crop&q=80",
    category: "Orthodontics",
    categoryColor: "bg-teal-50 text-teal-700 border-teal-200",
    icon: AlignCenter,
    price: "From $3,500",
    includes: ["3D digital scanning", "Custom aligner sets", "Retainers included"],
  },
  {
    title: "Dental Implants",
    desc: "A permanent, natural-looking solution for missing teeth that restores both function and aesthetics to your smile.",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80",
    category: "Restorative",
    categoryColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Layers,
    price: "From $2,800",
    includes: ["Surgical placement", "Custom abutment", "Lifelike crown finish"],
  },
  {
    title: "Porcelain Veneers",
    desc: "Custom-crafted thin shells bonded to the front of your teeth to correct chips, stains, or gaps for a flawless smile.",
    img: "/Porcelain Veneers1.jpg",
    category: "Cosmetic",
    categoryColor: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Diamond,
    price: "From $1,200/tooth",
    includes: ["Smile design preview", "Ultra-thin porcelain", "Stain-resistant material"],
  },
  {
    title: "Crowns & Bridges",
    desc: "Durable, tooth-colored restorations used to protect damaged teeth or seamlessly replace missing ones.",
    img: "/Crowns & Bridges.jpg",
    category: "Restorative",
    categoryColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Crown,
    price: "From $1,100",
    includes: ["Same-day options", "Color-matched ceramic", "Strengthens weak teeth"],
  },
];

export default function Services() {
  useScrollReveal();

  return (
    <div className="fade-in pb-24">

      {/* Hero */}
      <section className="relative pt-28 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&auto=format&fit=crop&q=85"
            alt="Dental clinic"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center text-white reveal">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold tracking-widest text-white/70 uppercase mb-4 border border-white/20 px-3 py-1 rounded-full">What We Offer</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 font-serif">
              Exceptional Care,{" "}
              <span className="italic font-normal text-white/90">Tailored to You</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              We offer a comprehensive range of dental services using state-of-the-art technology to ensure your comfort and deliver outstanding results.
            </p>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-8 bg-white border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground reveal">
            {["Preventive Care", "Cosmetic Dentistry", "Orthodontics", "Restorative", "Emergency Care"].map((cat) => (
              <span key={cat} className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 section-alt">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const delayClass = `reveal-delay-${(idx % 3) + 1}`;
              return (
                <div
                  key={idx}
                  className={`group bg-white rounded-3xl overflow-hidden border border-border/60 shadow-sm transition-all duration-500 hover:-translate-y-2.5 hover:shadow-xl hover:border-primary/20 flex flex-col reveal ${delayClass}`}
                >
                  <div className="relative h-60 overflow-hidden shrink-0 img-zoom">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <span className={`absolute top-4 left-4 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border backdrop-blur-sm ${service.categoryColor}`}>
                      {service.category}
                    </span>
                    <div className="absolute -bottom-5 right-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-primary z-10">
                      <service.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-7 pt-9 flex flex-col flex-1">
                    <h3 className="text-xl font-serif font-bold mb-3 leading-snug">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.desc}</p>

                    <div className="mb-6 flex-1">
                      <p className="text-xs font-bold text-foreground mb-2.5 uppercase tracking-wider">What's Included</p>
                      <ul className="space-y-2">
                        {service.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/40">
                      <span className="text-sm font-bold text-foreground bg-secondary/80 px-3 py-1.5 rounded-lg">
                        {service.price}
                      </span>
                      <Link href={`/appointment?service=${encodeURIComponent(service.title)}`}>
                        <Button className="rounded-full w-10 h-10 p-0 shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="section-teal-strip rounded-3xl p-12 md:p-16 text-center relative overflow-hidden reveal">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
                Book a free consultation and our team will help you build the right treatment plan for your smile and your budget.
              </p>
              <Link href="/appointment">
                <Button className="rounded-full bg-white text-primary hover:bg-white/90 px-10 h-13 text-base font-semibold shadow-xl hover:scale-105 transition-all">
                  Book a Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
