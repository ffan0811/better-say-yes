"use server";

import { cookies } from "next/headers";

export async function setCookie(data: { name: string; value: string }) {
  cookies().set(data.name, data.value);
}

export async function getCookie(name: string) {
  const data = cookies().get(name);
  return data?.value || null;
}
