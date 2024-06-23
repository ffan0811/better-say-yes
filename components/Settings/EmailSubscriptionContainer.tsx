"use client";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "../ui/use-toast";
import { handleError } from "@/lib/utils";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";

type EmailSubscriptionContainerProps = {
  isSubscribed?: boolean;
};

export default function EmailSubscriptionContainer({
  isSubscribed,
}: EmailSubscriptionContainerProps) {
  const supabase = createClient();
  const [isChecked, setIsChecked] = useState<boolean>(isSubscribed);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubscription = async (checked: boolean) => {
    setIsLoading(true);
    setIsChecked(checked);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          is_email_subscribed: checked,
        },
      });
      if (error) {
        throw new Error(error.message);
      }
      setIsChecked(checked);
    } catch (e) {
      const err = handleError(e);
      toast({
        variant: "destructive",
        title: ERROR_DEFAULT_TITLE,
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Switch
      disabled={isLoading}
      checked={isChecked}
      onCheckedChange={handleSubscription}
    />
  );
}
