"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { InputWithLabel, LABEL_WRAPPER_CLASSES } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  ERROR_DEFAULT_DESCRIPTION,
  ERROR_DEFAULT_TITLE,
} from "@/constants/message";
import { useToast } from "./ui/use-toast";
import { CheckboxWithText } from "./ui/checkbox";

export default function AccountForm({
  user,
  buttonText = "Submit",
}: {
  user: User | null;
  buttonText?: string;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [username, setFullName] = useState<string | null>(
    user?.user_metadata.full_name
  );
  const [isEmailNoSubscribed, setIsNoSubscribed] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  async function updateProfile({
    username,
    isEmailNoSubscribed,
  }: {
    username: string;
    isEmailNoSubscribed?: boolean;
  }) {
    try {
      setLoading(true);

      // email_verified and phone_verified of user metadata will be always false
      // Ref: https://github.com/orgs/supabase/discussions/20191#discussioncomment-8046171
      const { error } = await supabase.auth.updateUser({
        data: {
          username: username,
          is_email_subscribed: !isEmailNoSubscribed,
        },
      });
      if (error) throw error;
      // if (window?.ReactNativeWebView) {
      //   router.push("/welcome/notifications");
      // } else {
      //   router.push("/welcome/search");
      // }
    } catch (error) {
      toast({
        variant: "destructive",
        title: ERROR_DEFAULT_TITLE,
        description: ERROR_DEFAULT_DESCRIPTION,
      });
      setLoading(false);
    } finally {
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      toast({
        variant: "destructive",
        description: "Oops! It looks like you missed a few required fields.",
      });
      return;
    }
    updateProfile({ username, isEmailNoSubscribed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputWithLabel
        label="Email"
        id="email"
        type="text"
        value={user?.email}
        disabled
      />
      <InputWithLabel
        label="Username"
        id="username"
        type="text"
        value={username || ""}
        required
        onChange={(e) => setFullName(e.target.value)}
      />

      <div>
        <CheckboxWithText
          id="isEmailNoSubscribed"
          title="I don&#39;t want to receive emails about CreateYesOrYes and feature updates, marketing best practices, and promotions from CreateYesOrYes. By not checking the box, I agree to be opted in by default."
          checked={isEmailNoSubscribed}
          onCheckedChange={(checked) => setIsNoSubscribed(checked as boolean)}
        />
      </div>
      <div className="pt-4">
        <Button className="w-full" type="submit" disabled={loading}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
