import { Suspense, type ReactNode } from "react";

import CreateLayoutClient from "./CreateLayoutClient";

export default function CreateLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <CreateLayoutClient>{children}</CreateLayoutClient>
    </Suspense>
  );
}
