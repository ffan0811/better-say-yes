import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function CookieSetting() {
  return (
    <Alert className="fixed bottom-4 left-4 z-50 w-80 shadow">
      <AlertTitle>We use cookies!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
