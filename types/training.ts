export type TrainingType =
  | "worldview"
  | "tone"
  | "rule"
  | "forbidden";

export interface TrainingItem {
  id: string;
  type: TrainingType;
  content: string;
  status: "draft" | "approved" | "rejected";
  is_active: boolean;
  created_by: string | null;
  created_at: string;
}
