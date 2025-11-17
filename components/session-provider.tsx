"use client";
import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState, useRef } from "react";

const SessionContext = createContext<Session | null>(null);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();
  const initialized = useRef(false);

  useEffect(() => {
    // Get initial session without blocking
    if (!initialized.current) {
      initialized.current = true;
      // Use a non-blocking approach - get session in the background
      supabase.auth
        .getSession()
        .then(({ data: { session } }) => {
          setSession(session);
        })
        .catch(() => {
          // Silently fail - middleware will handle auth
        });
    }

    // Listen for auth state changes
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
