import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function isAuthenticated() {
  const all_cookies = cookies().getAll();
  const headers = new Headers();

  all_cookies.forEach((cookie) => {
    headers.set("cookie", `${cookie.name}=${cookie.value};`);
  });

  const req = {
    headers,
  };

  const secureCookie = process.env.NODE_ENV === "production";
  const cookieName = secureCookie
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const jwt = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie,
    salt: cookieName,
  });

  // If not authenticated throw error
  if (!!!jwt) throw new Error("Not authenticated");
}
