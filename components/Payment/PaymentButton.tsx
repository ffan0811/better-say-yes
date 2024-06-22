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
import { saveContents } from "@/actions/content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { ITEM_COMMON_CLASSES, ITEM_HEIGHT } from "../ContentItem";
import { EXTERNAL_REFUND_POLICY } from "@/constants";

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
      setIsLoading(true);
      const stripe = await getStripe();

      const res = await fetch(`/api/checkout-sessions`, {
        method: "POST",
        body: JSON.stringify({
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please log in");
    }

    try {
      setIsLoading(true);
      const { error } = await saveContents({ id: contentId, contents });
      if (error) {
        throw new Error(error.message);
      }
      // await handlePayment();
    } catch (e) {
      const err = handleError(e);
      toast({
        variant: "destructive",
        title: "Failed to save data",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isLoading} onClick={handleSave}>
          {isLoading ? "Saving..." : "Pay and Launch"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-theme(space.8))] md:max-w-xl">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-center">Payment</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col md:flex-row text-center md:text-left">
          <div
            className={`${ITEM_COMMON_CLASSES} ${ITEM_HEIGHT} max-w-40 mb-4 md:mb-0 text-center`}
            style={{
              background: contents.backgroundColor,
              color: contents.themeColor,
              borderColor: contents.themeColor,
            }}
          >
            {contents.question}
          </div>
          <Separator orientation="vertical" className="mx-4 hidden md:block" />
          <div>
            <p className="mb-4 font-medium tracking-tight text-lg md:text-xl">
              Surprise your loved ones with your creativity!
            </p>
            <Button onClick={handlePayment} isLoading={isLoading}>
              Pay Only{" "}
              {`${process.env.NEXT_PUBLIC_CURRENCY}${process.env.NEXT_PUBLIC_PRICE}`}{" "}
              and Launch
            </Button>
            <div className="text-sm mt-4 text-neutral-500 leading-tight tracking-tight">
              <p>
                * Your page will go on live as soon as you complete the payment.
              </p>
              <p>
                * By clicking the button above, you confirm that you have
                reviewed our{" "}
                <a
                  href={EXTERNAL_REFUND_POLICY}
                  target="_blank"
                  className="underline"
                >
                  refund policy.
                </a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
