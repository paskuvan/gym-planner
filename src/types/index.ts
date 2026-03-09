export interface User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    name: string;
    image?: string | null;
}

export interface UserProfile {
  userId: string;
  goal: "cut" | "bulk" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbbells";
  injuries?: string;
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
  updatedAt: string;
}