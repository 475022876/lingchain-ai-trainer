import { createClient } from "@supabase/supabase-js";

/**
 * ⚠️ Server-only Supabase Client
 * 使用 service_role key
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
