// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isReplayEnabled =
  process.env.NEXT_PUBLIC_SENTRY_REPLAYS_ENABLED === "true";

Sentry.init({
  dsn: "https://8abe1bab9fc4b6405265d1e6f06a6959@o4507649027866624.ingest.us.sentry.io/4507649029636096",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: isReplayEnabled ? 1.0 : 0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: isReplayEnabled ? 0.1 : 0,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: isReplayEnabled
    ? [
        Sentry.replayIntegration({
          // Additional Replay configuration goes in here, for example:
          maskAllText: true,
          blockAllMedia: true,
        }),
      ]
    : [],
});
