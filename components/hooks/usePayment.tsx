import { Tables } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import { handleError } from "@/lib/utils";
import { ErrorType } from "@/types/global";
import { useEffect, useState } from "react";

export default function usePayment({ userId }: { userId: string }) {
  const [payments, setPayments] = useState<Tables<"payments">[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);

  const supabase = createClient();

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const { data, error: apiError } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw Error(apiError.message);
      }
      if (data) {
        setPayments(data);
      }
    } catch (e) {
      const err = handleError(e);
      console.error(err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchPayments();
  }, [userId]);

  return { payments, count: (payments || []).length, error, isLoading };
}
