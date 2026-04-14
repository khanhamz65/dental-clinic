import { Suspense } from "react";
import { AppointmentContent } from "./AppointmentContent";

function AppointmentSkeleton() {
  return (
    <div className="fade-in py-12 md:py-24 min-h-screen bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <div className="h-10 bg-muted rounded-lg mb-8 w-1/3 mx-auto"></div>
          <div className="h-12 bg-muted rounded-lg w-full"></div>
        </div>
        <div className="glass-panel rounded-[2rem] p-6 md:p-10 shadow-xl bg-white dark:bg-card h-64 bg-muted animate-pulse"></div>
      </div>
    </div>
  );
}

export default function Appointment() {
  return (
    <Suspense fallback={<AppointmentSkeleton />}>
      <AppointmentContent />
    </Suspense>
  );
}
