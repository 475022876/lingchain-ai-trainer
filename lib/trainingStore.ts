import { supabase } from "./supabase";
import { TrainingType } from "@/types/training";

export async function addTraining(
  content: string,
  type: TrainingType,
  createdBy: string
) {
  const { error } = await supabase
    .from("training_data")
    .insert({
      content,
      type,
      created_by: createdBy
    });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getActiveTrainings() {
  const { data, error } = await supabase
    .from("training_data")
    .select("type, content")
    .eq("status", "approved")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
