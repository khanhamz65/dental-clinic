"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Heart, Award, Clock } from "lucide-react";
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

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

const TEAM = [
  {
    name: "Dr. Miller Jenkins",
    role: "Lead Dentist & Founder",
    bio: "Specializing in cosmetic dentistry and full mouth reconstruction. 15+ years in San Francisco.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80",
    delay: "reveal-delay-1",
  },
  {
    name: "Dr. Michael Chen",
    role: "Orthodontist",
    bio: "Expert in Invisalign, clear aligners, and traditional orthodontic treatments.",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
    delay: "reveal-delay-2",
  },
  {
    name: "Amanda Torres",
    role: "Head Hygienist",
    bio: "Passionate about preventive care, patient education, and gentle cleanings.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
    delay: "reveal-delay-3",
  },
  {
    name: "Dr. James Wu",
    role: "Oral Surgeon",
    bio: "Board-certified specialist in dental implants, extractions, and bone grafting.",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop&q=80",
    delay: "reveal-delay-4",
  },
];

const VALUES = [
  { icon: Shield, title: "Clinical Excellence", desc: "We utilize the latest evidence-based techniques and the most advanced diagnostic technology available." },
  { icon: Heart, title: "Compassionate Care", desc: "We listen, we explain, and we never rush. Every patient receives our full attention and genuine empathy." },
  { icon: Award, title: "Total Transparency", desc: "Clear treatment plans and upfront pricing. No surprise fees, no unnecessary procedures." },
  { icon: Clock, title: "Respect for Time", desc: "We value your schedule as much as our own. We run on time, every time." },
];

export default function About() {
  useScrollReveal();

  return (
    <div className="fade-in pb-24">

      {/* Hero */}
      <section className="relative pt-28 pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&auto=format&fit=crop&q=85"
            alt="Dental clinic interior"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <span className="inline-block text-xs font-bold tracking-widest text-white/60 uppercase mb-4 border border-white/20 px-3 py-1 rounded-full">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif text-white">
              Redefining the{" "}
              <span className="italic font-normal text-white/85">Dental Experience</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
              Founded on the belief that oral healthcare should be accessible, comfortable, and exceptional — we've built a practice where clinical excellence meets genuine hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12 reveal-left">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative group aspect-[3/4] w-full img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&auto=format&fit=crop&q=85"
                  alt="Dr. Miller Jenkins"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            <div className="lg:w-7/12 reveal-right">
              <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">A Vision for Better Care</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 mt-2">
                Built Around the Patient Experience
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>
                  "I started BrightSmile with a simple premise: people shouldn't dread going to the dentist. I wanted to create an environment that felt less like a clinical waiting room and more like a wellness retreat."
                </p>
                <p>
                  Over the past decade, we've carefully curated every aspect of the patient experience — from the lighting and scent of our lobby to the noise-canceling headphones in our treatment rooms. Every detail is intentional.
                </p>
                <div className="pt-4 border-l-4 border-primary/30 pl-6">
                  <p className="font-semibold text-foreground text-xl font-serif">
                    "Excellence isn't a goal — it's a habit."
                  </p>
                  <p className="text-base text-primary mt-2 font-medium">— Dr. Miller Jenkins, Founder & Lead Dentist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="py-16 section-teal-strip text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
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
                <p className="text-sm text-white/70 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 section-alt">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 mt-2">The Principles That Guide Us</h2>
            <p className="text-muted-foreground">The beliefs behind every interaction, treatment, and decision we make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {VALUES.map((value, idx) => (
              <div
                key={idx}
                className={`bg-white p-8 rounded-3xl border border-border/60 shadow-sm text-center transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 reveal reveal-delay-${idx + 1}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-3 font-serif">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3 bg-primary/10 px-3 py-1 rounded-full">The Team</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 mt-2">Meet Our Experts</h2>
            <p className="text-muted-foreground">A dedicated group of professionals passionate about your dental health and overall well-being.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, idx) => (
              <div key={idx} className={`group text-center reveal ${member.delay}`}>
                <div className="rounded-3xl overflow-hidden mb-5 aspect-square relative shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl img-zoom">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                </div>
                <h4 className="text-xl font-serif font-bold mb-1">{member.name}</h4>
                <p className="text-primary text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
