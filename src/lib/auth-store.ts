// Lightweight localStorage-backed role/session for the prototype.
// Replace with Lovable Cloud auth in follow-up.
import { useEffect, useState } from "react";
import type { Role } from "./mock-data";

const KEY = "skillswap.session.v1";

export interface Session {
  role: Role;
  name: string;
  email: string;
}

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function write(s: Session | null) {
  if (typeof window === "undefined") return;
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("skillswap-session"));
}

export function signIn(s: Session) {
  write(s);
}

export function signOut() {
  write(null);
}

export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    setSession(read());
    const handler = () => setSession(read());
    window.addEventListener("skillswap-session", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("skillswap-session", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return session;
}
