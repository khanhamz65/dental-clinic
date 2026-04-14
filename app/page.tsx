"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, ChevronRight, Award, Users, ShieldCheck, HeartPulse, Clock, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const SERVICES = [
  {
    title: "Checkup & Cleaning",
    desc: "Keep your smile healthy with routine cleanings, exams, and digital x-rays.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&auto=format&fit=crop&q=80",
    badge: "Preventive",
    delay: "reveal-delay-1",
  },
  {
    title: "Professional Whitening",
    desc: "Safely and effectively brighten your smile by several shades in just one visit.",
    img: "Professional Whitening.jpg",
    badge: "Cosmetic",
    delay: "reveal-delay-2",
  },
  {
    title: "Invisalign®",
    desc: "Straighten your teeth discreetly with custom-made, virtually invisible aligners.",
    img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&auto=format&fit=crop&q=80",
    badge: "Orthodontics",
    delay: "reveal-delay-3",
  },
  {
    title: "Dental Implants",
    desc: "A permanent, natural-looking solution for missing teeth that lasts a lifetime.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80",
    badge: "Restorative",
    delay: "reveal-delay-1",
  },
  {
    title: "Porcelain Veneers",
    desc: "Custom-crafted thin shells bonded to your teeth for a flawless smile.",
    img: "Porcelain Veneers1.jpg",
    badge: "Cosmetic",
    delay: "reveal-delay-2",
  },
  {
    title: "Crowns & Bridges",
    desc: "Durable, tooth-colored restorations used to protect damaged teeth.",
    img: "Crowns & Bridges.jpg",
    badge: "Restorative",
    delay: "reveal-delay-3",
  },
];

const TESTIMONIALS = [
  {
    text: "I used to dread going to the dentist, but BrightSmile completely changed my experience. The staff is incredibly kind, and my teeth have never looked better.",
    name: "Emily R.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    delay: "reveal-delay-1",
  },
  {
    text: "Got my veneers done here and couldn't be happier. The results are stunning and the whole process was explained so clearly at every step.",
    name: "Marcus T.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    delay: "reveal-delay-2",
  },
  {
    text: "After years of being self-conscious about my smile, Dr. Jenkins completely transformed it. The Invisalign treatment was seamless and pain-free.",
    name: "Sophia L.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
    delay: "reveal-delay-3",
  },
];

export default function Home() {
  useScrollReveal();

  return (
    <div className="fade-in">

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&auto=format&fit=crop&q=85"
            alt="Modern dental clinic"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-20">
          <div className="max-w-[580px] slide-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Now Accepting New Patients
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold mb-6 leading-[1.08] font-serif text-foreground">
              Modern Dental Care{" "}
              <br />
              <span className="text-primary italic font-normal">For a Healthy Smile.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-9 leading-relaxed max-w-lg">
              Experience premium dentistry in a calm, luxurious environment. Advanced technology with genuine care — for the smile you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/appointment">
                <Button size="lg" className="rounded-full px-8 h-13 text-base shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-13 text-base border-border/60 bg-white/60 backdrop-blur-sm hover:bg-white/90 transition-all">
                  View Services
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-foreground/80">
              <div className="flex -space-x-2.5">
                {[10, 11, 12, 13].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/80?img=${i}`}
                    alt="Patient"
                    className="w-9 h-9 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Trusted by 2,000+ patients</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-8 lg:right-16 glass-panel p-4 rounded-2xl z-20 hidden md:flex items-center gap-4" style={{ animation: "float 4s ease-in-out infinite" }}>
          <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Next Available Slot</p>
            <p className="text-base font-bold text-foreground">Today — 2:00 PM</p>
          </div>
        </div>
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-white border-y border-border/60 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 reveal">
            {[
              { icon: Award, label: "15+ Years Experience" },
              { icon: Users, label: "2,000+ Patients Served" },
              { icon: Star, label: "4.9 / 5 Average Rating" },
              { icon: ShieldCheck, label: "All Insurance Accepted" },
              { icon: HeartPulse, label: "Same-Day Emergencies" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-foreground/80 whitespace-nowrap">
                <Icon className="w-5 h-5 text-primary shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 section-alt">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Comprehensive Dental Care</h2>
            <p className="text-muted-foreground">From routine cleanings to complete smile makeovers, we offer everything you need under one roof.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className={`group bg-white rounded-3xl overflow-hidden border border-border/60 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 flex flex-col reveal ${service.delay}`}
              >
                <div className="relative h-52 overflow-hidden shrink-0 img-zoom">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                    {service.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-serif font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 flex-1 leading-relaxed">{service.desc}</p>
                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all"
                  >
                    Book Now <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link href="/services">
              <Button variant="outline" className="rounded-full px-8 h-12 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 section-blue-dark text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center reveal">
            {[
              { end: 15, suffix: "+", label: "Years of Excellence" },
              { end: 2400, suffix: "+", label: "Happy Patients" },
              { end: 98, suffix: "%", label: "Patient Satisfaction" },
              { end: 12, suffix: "+", label: "Expert Dentists" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-white/60 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative reveal-left">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/8 to-transparent rounded-3xl -z-10 -rotate-2"></div>
              <div className="rounded-3xl overflow-hidden shadow-2xl relative group aspect-[4/5] w-full img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=900&auto=format&fit=crop&q=85"
                  alt="Clinic Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-5 rounded-2xl max-w-[220px] shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-base text-foreground leading-tight">4.9 / 5 Rating</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Based on 500+ reviews</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 reveal-right">
              <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">The BrightSmile Difference</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 mt-2">
                Changing the way you experience dentistry.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe going to the dentist shouldn't be stressful. Our clinic is designed to feel like a sanctuary — gentle, compassionate, and always on your side.
              </p>

              <ul className="space-y-5 mb-10">
                {[
                  "State-of-the-art diagnostic technology",
                  "Comfort-focused amenities (TVs, headphones, blankets)",
                  "Transparent pricing with no hidden fees",
                  "Flexible scheduling including evenings",
                  "Anxiety-free sedation options available",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/about">
                <Button variant="outline" className="rounded-full px-8 h-12 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">Patient Stories</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Our Patients Say</h2>
            <p className="text-muted-foreground">Don't just take our word for it. Here's what real patients say about their experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review, idx) => (
              <div key={idx} className={`bg-white border border-border/60 rounded-3xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-400 relative reveal ${review.delay}`}>
                <div className="absolute top-6 right-8 text-6xl text-primary/15 font-serif leading-none select-none">"</div>
                <div className="flex text-amber-400 mb-5 gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-7 italic text-[15px]">{review.text}</p>
                <div className="flex items-center gap-3.5 border-t border-border/40 pt-5">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="font-bold text-foreground text-sm">{review.name}</h5>
                    <p className="text-xs text-muted-foreground">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Doctor */}
      <section className="py-24 section-alt relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <div className="lg:w-5/12 relative reveal-right">
              <div className="absolute -inset-3 bg-gradient-to-bl from-primary/8 to-transparent rounded-3xl -z-10 rotate-2"></div>
              <div className="rounded-3xl overflow-hidden shadow-2xl relative group aspect-[4/5] img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=85"
                  alt="Dr. Sarah Jenkins"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:w-7/12 reveal-left">
              <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">Meet Your Doctor</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-2 mt-2">Dr. Sarah Jenkins, DDS</h2>
              <p className="text-lg text-primary italic mb-6">Founder & Lead Dentist — 15 Years Experience</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Dr. Jenkins completed her degree at UCSF School of Dentistry and has practiced in San Francisco for over 15 years. Specializing in cosmetic and restorative dentistry, she combines artistry with clinical precision to deliver results that truly change lives.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-10">
                {["UCSF Graduate", "Board Certified", "ADA Member", "Invisalign Certified"].map((cred, idx) => (
                  <span key={idx} className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                    {cred}
                  </span>
                ))}
              </div>

              <Link href="/about">
                <Button className="rounded-full px-8 h-12 shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA strip */}
      <section className="py-5 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2.5 text-red-700">
            <HeartPulse className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-base">Dental Emergency? We're here.</span>
          </div>
          <a href="tel:4155559999" className="flex items-center gap-2 font-bold text-red-700 hover:text-red-800 transition-colors text-lg">
            <Phone className="w-5 h-5" />
            (000) 123-4567
          </a>
          <span className="text-red-500 text-sm">Emergency Line — Available During Office Hours</span>
        </div>
      </section>

      {/* Footer Credit */}
      <footer className="py-8 bg-background border-t border-border/60">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            Design and Developer by <span className="font-semibold text-foreground">HAMZA MUNIR</span>
          </p>
          <a href="mailto:khanhamz65@gmail.com" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            khanhamz65@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
}
