export type MobileModule = {
  slug: string;
  name: string;
  description: string;
};

export const mobileModules: MobileModule[] = [
  { slug: "onboarding", name: "Onboarding & Patient Profile", description: "Patient intake, cycle history, symptoms, diagnosis history, and goals." },
  { slug: "symptom-tracking", name: "Daily Symptom & Cycle Tracking", description: "Pain, bleeding, fatigue, mood, cycle events, and flare summaries." },
  { slug: "risk-assessment", name: "Endo Risk Assessment", description: "Questionnaire-based AI risk scoring with explainable factors." },
  { slug: "imaging-analysis", name: "MRI / Ultrasound Imaging Analysis", description: "Upload scans, review lesion detection, and summarize findings." },
  { slug: "exercise-coach", name: "Pelvic Floor & Exercise Coach", description: "Guided routines, pose feedback, and progress tracking." },
  { slug: "medication-tracking", name: "Medication & Side-Effect Tracking", description: "Reminders, dosage logs, side effects, and adherence tracking." },
  { slug: "lifestyle-analytics", name: "Lifestyle & Trigger Analytics", description: "Track food, sleep, stress, activity, and flare correlations." },
  { slug: "education-hub", name: "Education Hub", description: "Evidence-based articles, videos, myths vs facts, and self-care guides." },
  { slug: "ai-chatbot", name: "AI Endo Chatbot", description: "Conversational assistant for general education and report explanation." },
  { slug: "community-forum", name: "Community Forum", description: "Anonymous discussion groups, comments, saved posts, and moderation." },
  { slug: "care-navigation", name: "Care Navigation & Maps", description: "Nearby specialists, clinics, hospitals, and directions." },
  { slug: "report-generation", name: "Doctor-Ready Report Generation", description: "Timeline, pain charts, medication logs, and PDF exports." },
  { slug: "notifications", name: "Notifications & Smart Reminders", description: "Check-ins, medication alerts, appointments, and flare warnings." },
  { slug: "user-profile", name: "User Profile & Settings", description: "Privacy, language, theme, exports, and account controls." }
];

