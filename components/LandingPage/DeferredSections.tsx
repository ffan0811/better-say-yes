"use client";

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useRef, useState } from "react";
import ProductionProviders from "../ProductionProviders";

const SecondarySection = dynamic(() => import("./SecondarySection"), {
  ssr: false,
});
const UseCasesSection = dynamic(() => import("./UseCasesSection"), {
  ssr: false,
});
const TrySection = dynamic(() => import("./TrySection"), {
  ssr: false,
});
const CTASection = dynamic(() => import("./CTASection"), {
  ssr: false,
});

function DeferredSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldRender) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : null}
    </div>
  );
}

export function DeferredSecondarySection() {
  return (
    <DeferredSection className="h-full">
      <SecondarySection />
    </DeferredSection>
  );
}

export function DeferredUseCasesSection() {
  return (
    <DeferredSection>
      <UseCasesSection />
    </DeferredSection>
  );
}

export function DeferredTrySection() {
  return (
    <DeferredSection>
      <TrySection />
    </DeferredSection>
  );
}

export function DeferredCTASection({ className = "" }: { className: string }) {
  return (
    <DeferredSection className="h-full">
      <ProductionProviders>
        <CTASection className={className} />
      </ProductionProviders>
    </DeferredSection>
  );
}
