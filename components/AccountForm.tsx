"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import { InputWithLabel } from "./ui/input";
import { Button } from "./ui/button";
import {
  ERROR_DEFAULT_DESCRIPTION,
  ERROR_DEFAULT_TITLE,
} from "@/constants/message";
import { useToast } from "./ui/use-toast";
import { CheckboxWithText } from "./ui/checkbox";
import { handleError } from "@/lib/utils";

export default function AccountForm({
  user,
  buttonText = "Submit",
}: {
  user: User | null;
  buttonText?: string;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(
    user?.user_metadata.username
  );
  const [isEmailSubscribed, setIsSubscribed] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  async function updateProfile({
    username,
    isEmailSubscribed,
  }: {
    username: string;
    isEmailSubscribed?: boolean;
  }) {
    try {
      setLoading(true);

      // email_verified and phone_verified of user metadata will be always false
      // Ref: https://github.com/orgs/supabase/discussions/20191#discussioncomment-8046171
      const { error } = await supabase.auth.updateUser({
        data: {
          username: username,
          is_email_subscribed: isEmailSubscribed,
        },
      });
      if (error) throw new Error(error.message);
      router.push("/dashboard");
    } catch (error) {
      const err = handleError(error);
      toast({
        variant: "destructive",
        title: ERROR_DEFAULT_TITLE,
        description: err.message,
      });
    } finally {
      setLoading(false);
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
    updateProfile({ username, isEmailSubscribed });
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
        onChange={(e) => setUsername(e.target.value)}
      />

      <div>
        <CheckboxWithText
          id="isEmailSubscribed"
          title="I want to receive promotion codes and emails about feature updates from BetterSayYes. If you do not check the box, you will be opted in by default."
          checked={isEmailSubscribed}
          onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
        />
      </div>
      <div className="pt-4">
        <Button className="w-full" type="submit" isLoading={loading}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
