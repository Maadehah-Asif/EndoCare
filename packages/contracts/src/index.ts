export type ModuleSlug =
  | "onboarding"
  | "symptom-tracking"
  | "risk-assessment"
  | "imaging-analysis"
  | "exercise-coach"
  | "medication-tracking"
  | "lifestyle-analytics"
  | "education-hub"
  | "ai-chatbot"
  | "community-forum"
  | "care-navigation"
  | "report-generation"
  | "notifications"
  | "user-profile";

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type SpecialistLocation = {
  id: string;
  name: string;
  city: string;
  specialty: string;
};

