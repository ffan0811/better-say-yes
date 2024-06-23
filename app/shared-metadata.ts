export const SHORT_TITLE = "BetterSayYes";
export const TITLE = "BetterSayYes: Your Fun, Personalized Decision-Making Page";
export const DESCRIPTION =
    "Create and customize fun decision-making pages. Engage with creative questions, interactive yes or no options, and personalized images. Join us for 100% fun and success in every decision!";

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

