"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import getStripe from "@/lib/stripe/get-stripe";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { contentsAtom } from "@/atoms/content";
import { useToast } from "../ui/use-toast";
import { handleError } from "@/lib/utils";
import { ContentsType } from "@/types/content";
import { saveContents } from "@/actions/content";

export default function PaymentButton({ contentId }: { contentId: string }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contents, setContents] = useAtom(contentsAtom);
  const { toast } = useToast();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handlePayment = async () => {
    try {
      const stripe = await getStripe();

      const res = await fetch(`/api/checkout-sessions`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          contentId,
        }),
      });
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const { data } = await res.json();

      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: data.id,
      });
      if (error) {
        throw Error(error.message);
      }
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
    } catch (e) {
      console.error("checkoutSession", e);
      // error = e;
      // toast(`${FAIL_PAYMENT}: ${error.message}`, {
      //   type: "error",
      // });
    }
  };

  // TODO: avoid duplicate functions
  const sendImagesToDB = async ({
    contentId,
    data,
  }: {
    contentId: string;
    data: File[];
  }) => {
    try {
      const formData = new FormData();
      formData.append("contentId", contentId || "");
      (data || []).forEach((ele) => {
        formData.append("images", ele);
      });
      const response = await fetch(`/api/contents`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (e) {
      const error = handleError(e);
      toast({
        variant: "destructive",
        title: "Failed to upload images",
        description: error.message,
      });
    }
  };

  const sendContentsToDB = async ({
    contentId,
    data,
  }: {
    contentId: string;
    data: ContentsType;
  }) => {
    delete data["images"];
    const { error } = await saveContents({ id: contentId, contents: data });
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed to save data",
        description: error.message,
      });
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in");
    }

    try {
      setIsLoading(true);
      await sendImagesToDB({ contentId, data: contents.images });
      await sendContentsToDB({ contentId, data: contents });
      await handlePayment();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleSubmit}>
      {isLoading ? "Saving..." : "Pay and Launch"}
    </Button>
  );
}
