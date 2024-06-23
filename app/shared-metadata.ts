export const SHORT_TITLE = "BetterSayYes";
export const TITLE = "BetterSayYes: Get a Yes with Your Fun, Personalized Pages";
export const DESCRIPTION =
    "Create customized pages to get a yes in a fun and engaging way. Use creative questions and personalized images with yes or no options. Join us for 100% fun and success in getting that yes!";

export const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}`
    : "http://localhost:3000";

export const openGraphDefault = {
    title: TITLE,
    description: DESCRIPTION,
    siteName: SHORT_TITLE,
    locale: "en_US",
    type: "website"
}
