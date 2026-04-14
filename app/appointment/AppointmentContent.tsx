"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, CheckCircle2, Calendar as CalendarIcon, Clock, Stethoscope } from "lucide-react";

const SERVICES = [
  "Comprehensive Exams & Cleaning",
  "Professional Whitening",
  "Invisalign® Clear Aligners",
  "Dental Implants",
  "Porcelain Veneers",
  "Crowns & Bridges",
  "Other / Consultation",
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM",
];

function getMockBookedSlots(date: Date): string[] {
  const seed = date.getDate() + date.getMonth() * 31 + date.getFullYear();
  return TIME_SLOTS.filter((_, i) => (i + seed) % 5 === 0 || (i * 3 + seed) % 7 === 0);
}

export function AppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(searchParams.get("service") || "");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc && SERVICES.includes(svc)) {
      setSelectedService(svc);
      setStep(2);
    }
  }, [searchParams]);

  const bookedSlots = selectedDate ? getMockBookedSlots(selectedDate) : [];
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const dateFormat = "MMMM yyyy";

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    if (isBefore(day, startOfDay(new Date()))) return;
    setSelectedDate(day);
    setSelectedTime("");
    setIsLoadingSlots(true);
    setTimeout(() => setIsLoadingSlots(false), 400);
    setStep(3);
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime || !selectedService || !formData.name || !formData.phone || !formData.email) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setStep(5);
    }, 1500);
  };

  return (
    <div className="fade-in py-12 md:py-24 min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">

        {step < 5 && (
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">Book Your Visit</h1>

            {/* Progress Bar */}
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-border -z-10 rounded-full"></div>
              <div
                className="absolute left-0 top-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 border-background ${step >= i ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground px-1">
              <span>Service</span>
              <span>Date</span>
              <span>Time</span>
              <span>Details</span>
            </div>
          </div>
        )}

        <div className="glass-panel rounded-[2rem] p-6 md:p-10 shadow-xl bg-white dark:bg-card">

          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="slide-up">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                <Stethoscope className="text-primary w-6 h-6" /> Select a Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      setSelectedService(service);
                      setStep(2);
                    }}
                    className={`p-5 rounded-2xl border-2 text-left transition-all hover:border-primary hover:shadow-md ${selectedService === service ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-border"}`}
                  >
                    <div className="font-semibold text-lg">{service}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DATE */}
          {step === 2 && (
            <div className="slide-up">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                  <CalendarIcon className="text-primary w-6 h-6" /> Choose a Date
                </h2>
                <Button variant="ghost" onClick={() => setStep(1)} className="text-muted-foreground">Back</Button>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6 bg-secondary p-2 rounded-2xl">
                  <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-xl"><ChevronLeft className="w-5 h-5" /></Button>
                  <span className="font-bold text-lg">{format(currentMonth, dateFormat)}</span>
                  <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-xl"><ChevronRight className="w-5 h-5" /></Button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm font-bold text-muted-foreground">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map((day) => {
                    const isPast = isBefore(day, startOfDay(new Date()));
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    return (
                      <button
                        key={day.toString()}
                        onClick={() => onDateClick(day)}
                        disabled={isPast}
                        className={`
                          aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all
                          ${isPast ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-secondary cursor-pointer"}
                          ${isSelected ? "bg-primary text-white hover:bg-primary shadow-lg shadow-primary/30 scale-110" : ""}
                          ${isToday(day) && !isSelected ? "text-primary border-2 border-primary/30" : ""}
                        `}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TIME */}
          {step === 3 && (
            <div className="slide-up">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                    <Clock className="text-primary w-6 h-6" /> Select a Time
                  </h2>
                  {selectedDate && <p className="text-muted-foreground mt-2 font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>}
                </div>
                <Button variant="ghost" onClick={() => setStep(2)} className="text-muted-foreground">Back</Button>
              </div>

              {isLoadingSlots ? (
                <div className="flex justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {TIME_SLOTS.map((time) => {
                    const isBooked = bookedSlots.includes(time);
                    return (
                      <button
                        key={time}
                        disabled={isBooked}
                        onClick={() => {
                          setSelectedTime(time);
                          setStep(4);
                        }}
                        className={`
                          py-4 rounded-xl font-medium text-sm transition-all border-2
                          ${isBooked ? "opacity-50 cursor-not-allowed bg-muted border-transparent" : "hover:border-primary hover:text-primary border-border cursor-pointer"}
                          ${selectedTime === time ? "bg-primary text-white border-primary ring-4 ring-primary/20" : ""}
                        `}
                      >
                        {time}
                        {isBooked && <span className="block text-[10px] uppercase tracking-wider mt-1 opacity-70">Booked</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: DETAILS */}
          {step === 4 && (
            <div className="slide-up">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold">Your Details</h2>
                <Button variant="ghost" onClick={() => setStep(3)} className="text-muted-foreground">Back</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 bg-secondary/50 border-transparent focus:border-primary" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12 bg-secondary/50 border-transparent focus:border-primary" placeholder="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 bg-secondary/50 border-transparent focus:border-primary" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="min-h-[100px] bg-secondary/50 border-transparent focus:border-primary" placeholder="Any specific concerns?" />
                  </div>
                </div>

                <div className="bg-secondary/30 p-6 rounded-2xl h-fit">
                  <h3 className="font-bold text-lg mb-4 border-b pb-4">Booking Summary</h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground mb-1">Service</dt>
                      <dd className="font-medium text-base">{selectedService}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground mb-1">Date & Time</dt>
                      <dd className="font-medium text-base">
                        {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground mb-1">Location</dt>
                      <dd className="font-medium text-base">BrightSmile Clinic<br />123 Luminous Ave, SF</dd>
                    </div>
                  </dl>

                  <Button
                    onClick={handleBook}
                    disabled={isBooking}
                    className="w-full mt-8 h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                  >
                    {isBooking ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        Confirming...
                      </span>
                    ) : "Confirm Appointment"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div className="text-center py-12 slide-up">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Thank you, {formData.name}. Your appointment for{" "}
                <strong className="text-foreground">{selectedService}</strong> is set for{" "}
                <strong className="text-foreground">
                  {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
                </strong>. A confirmation has been sent to your email.
              </p>
              <Button
                onClick={() => {
                  setStep(1);
                  setFormData({ name: "", phone: "", email: "", message: "" });
                  setSelectedDate(null);
                  setSelectedTime("");
                  setSelectedService("");
                  router.push("/");
                }}
                className="rounded-full px-8 h-12"
              >
                Return to Home
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
