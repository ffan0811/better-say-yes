import { Suspense } from "react";

import CreatePageClient from "./CreatePageClient";

export default function CreatePage() {
  return (
    <Suspense fallback={null}>
      <CreatePageClient />
    </Suspense>
  );
}
