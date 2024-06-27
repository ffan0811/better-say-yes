"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getCookie, setCookie } from "@/actions/cookie";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { CookieType } from "@/types/global";
import { CardDescription } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Switch } from "./ui/switch";
import { useToast } from "./ui/use-toast";
import { usePathname } from "next/navigation";

const cookies = [
  {
    title: "Tracking cookies",
    value: CookieType.ANALYTICS_CONSENT,
    description:
      "These cookies are used to collect information to analyze the traffic to our website and how visitors are using our website. The information collected through these tracking and performance cookies do not identify any individual visitor.",
  },
];

const ANALYTICS_CONSENT_GIVEN = "analyticsConsentGiven";

export default function CookieSetting() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useState([
    { name: CookieType.COOKIE_CONSENT, value: false },
    { name: CookieType.ANALYTICS_CONSENT, value: false },
  ]);
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const cookieConsent = await getCookie(CookieType.COOKIE_CONSENT);
      const analyticsConsent = await getCookie(CookieType.ANALYTICS_CONSENT);

      setList([
        { name: CookieType.COOKIE_CONSENT, value: cookieConsent === "true" },
        {
          name: CookieType.ANALYTICS_CONSENT,
          value: analyticsConsent === "true",
        },
      ]);
      setIsLoading(false);
    };
    init();
  }, []);

  const handleCookie = async (data: {
    checked: boolean;
    value: CookieType;
  }) => {
    if (data.value === CookieType.ANALYTICS_CONSENT) {
      window.analytics = window.analytics || [];
      window.analytics.push(ANALYTICS_CONSENT_GIVEN);
    }
    await setCookie({
      name: data.value,
      value: data.checked ? "true" : "false",
    });

    setList((prevList) =>
      prevList.map((item) =>
        item.name === data.value ? { ...item, value: data.checked } : item
      )
    );
    setCookieConsentTrue();
  };

  const setCookieConsentTrue = async () => {
    setList((prevList) =>
      prevList.map((item) =>
        item.name === CookieType.COOKIE_CONSENT
          ? { ...item, value: true }
          : item
      )
    );
    await setCookie({ name: CookieType.COOKIE_CONSENT, value: "true" });
  };
  return (
    <>
      <Dialog>
        {typeof window !== "undefined" &&
          window.analytics?.includes(ANALYTICS_CONSENT_GIVEN) && (
            <GoogleAnalytics gaId="G-7THTQS3FPJ" />
          )}
        {isLoading ||
        pathname.includes("my") ||
        list.find((ele) => ele.name === CookieType.COOKIE_CONSENT)
          ?.value ? null : (
          <Alert className="fixed bottom-4 left-4 z-50 w-80 shadow">
            <AlertTitle className="mb-2">Cookies</AlertTitle>
            <AlertDescription>
              We use cookies and other tracking technologies to improve your
              browsing experience on our website, to show you personalized
              content and targeted ads, to analyze our website traffic, and to
              understand where our visitors are coming from.
              <div className="flex space-x-2 w-5/6 mx-auto mt-4">
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    Preferences
                  </Button>
                </DialogTrigger>

                <Button
                  className="w-full"
                  onClick={() =>
                    handleCookie({
                      checked: true,
                      value: CookieType.ANALYTICS_CONSENT,
                    })
                  }
                >
                  Accept All
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie settings</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences
            </DialogDescription>
          </DialogHeader>
          <Item
            title="Essential cookies"
            checked={true}
            description="These cookies are essential to provide you with services available through our website and to enable you to use certain features of our website. Without these cookies, we cannot provide you certain services on our website."
            disabled={true}
          />
          {cookies.map((ele) => (
            <Item
              key={ele.value}
              title={ele.title}
              value={ele.value}
              description={ele.description}
              checked={
                list.find((cookie) => cookie.name === ele.value)?.value || false
              }
              onCheckedChange={({ checked, value }) =>
                handleCookie({ checked, value })
              }
            />
          ))}

          <DialogTrigger asChild>
            <Button onClick={setCookieConsentTrue} className="mt-4">
              Save
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Item({
  title,
  value,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  title: string;
  value?: CookieType;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: ({
    checked,
    value,
  }: {
    checked: boolean;
    value: CookieType;
  }) => void;
}) {
  return (
    <div>
      <Label>{title}</Label>
      <div className="flex justify-between items-center space-x-8">
        <CardDescription>{description}</CardDescription>
        <Switch
          disabled={disabled}
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange?.({ checked, value })}
        />
      </div>
    </div>
  );
}
