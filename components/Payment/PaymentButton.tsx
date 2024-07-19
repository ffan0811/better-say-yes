"use client";
import { Button } from "../ui/button";
import getStripe from "@/lib/stripe/get-stripe";
import { useMemo, useState } from "react";
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
import { ITEM_COMMON_CLASSES, ITEM_SIZE } from "../ContentItem";
import { EXTERNAL_REFUND_POLICY } from "@/constants";
import { ERROR_DEFAULT_TITLE } from "@/constants/message";
import { Tables } from "@/database.types";

export default function PaymentButton({
  contentId,
  user,
  isFirstOrder,
  pricing = [],
}: {
  contentId: string;
  user: User;
  isFirstOrder?: boolean;
  pricing: Tables<"pricing">[];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contents, setContents] = useAtom(contentsAtom);
  const { toast } = useToast();

  const { isFree, freePricing, paidPricing } = useMemo(
    () => ({
      isFree: isFirstOrder,
      freePricing: (pricing || []).find((ele) => ele?.name === "free"),
      paidPricing: (pricing || []).find((ele) => ele?.name === "default"),
    }),
    [isFirstOrder, pricing]
  );

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const stripe = await getStripe();
      const priceId = isFree
        ? freePricing?.stripe_price_id
        : paidPricing?.stripe_price_id;

      const res = await fetch(`/api/checkout-sessions`, {
        method: "POST",
        body: JSON.stringify({ contentId, priceId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw Error(data?.message || "Failed to make a payment");
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
          {isLoading ? "Saving..." : "Launch"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-theme(space.8))] md:max-w-xl">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-center">
            {isFree ? "Launch" : "Payment"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col md:flex-row text-center md:text-left">
          <div
            className={`${ITEM_COMMON_CLASSES} ${ITEM_SIZE} max-w-40 mb-4 md:mb-0 text-center`}
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
              {isFree ? (
                <>Launch for Free</>
              ) : (
                <>
                  Pay&nbsp;{paidPricing.currency}
                  {paidPricing.price} and Launch
                </>
              )}
            </Button>
            <div className="text-sm mt-4 text-neutral-500 leading-tight tracking-tight">
              {isFree ? (
                <>
                  <p>
                    * Your page will go on live as soon as you complete the
                    process.
                  </p>
                  <p>
                    * Your first purchase is on us! After that, we'll charge
                    just a little for content.
                  </p>
                </>
              ) : (
                <p>
                  * Your page will go on live as soon as you complete the
                  payment.
                </p>
              )}
              {isFree ? null : (
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
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
