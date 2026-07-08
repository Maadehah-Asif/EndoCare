export type ApiModule = {
  slug: string;
  name: string;
  ownership: string;
  futureService?: string;
};

export const apiModules: ApiModule[] = [
  { slug: "onboarding", name: "Onboarding & Patient Profile", ownership: "patient intake and profile management" },
  { slug: "symptom-tracking", name: "Daily Symptom & Cycle Tracking", ownership: "daily logs and cycle summaries" },
  { slug: "risk-assessment", name: "Endo Risk Assessment", ownership: "AI risk scoring", futureService: "risk-engine" },
  { slug: "imaging-analysis", name: "MRI / Ultrasound Imaging Analysis", ownership: "scan upload and lesion review", futureService: "imaging-engine" },
  { slug: "exercise-coach", name: "Pelvic Floor & Exercise Coach", ownership: "exercise plans and progress" },
  { slug: "medication-tracking", name: "Medication & Side-Effect Tracking", ownership: "schedules, logs, and side effects" },
  { slug: "lifestyle-analytics", name: "Lifestyle & Trigger Analytics", ownership: "sleep, stress, food, activity, flare patterns" },
  { slug: "education-hub", name: "Education Hub", ownership: "curated education content" },
  { slug: "ai-chatbot", name: "AI Endo Chatbot", ownership: "general assistant orchestration" },
  { slug: "community-forum", name: "Community Forum", ownership: "posts, comments, moderation" },
  { slug: "care-navigation", name: "Care Navigation & Maps", ownership: "location search and specialist listings" },
  { slug: "report-generation", name: "Doctor-Ready Report Generation", ownership: "report assembly and export" },
  { slug: "notifications", name: "Notifications & Smart Reminders", ownership: "scheduled reminders and alert policy" },
  { slug: "user-profile", name: "User Profile & Settings", ownership: "preferences, privacy, and account settings" }
];

