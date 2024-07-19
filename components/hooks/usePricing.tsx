import { Tables } from "@/database.types";
import { createClient } from "@/lib/supabase/client";
import { handleError } from "@/lib/utils";
import { ErrorType } from "@/types/global";
import { useEffect, useState } from "react";

export default function usePricing() {
  const [pricing, setPricing] = useState<Tables<"pricing">[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);

  const supabase = createClient();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data, error: apiError } = await supabase
        .from("pricing")
        .select("*");

      if (error) {
        throw Error(apiError.message);
      }
      if (data) {
        setPricing(data);
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
    fetchData();
  }, []);

  return { pricing, error, isLoading };
}
