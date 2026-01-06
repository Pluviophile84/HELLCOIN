import { NextRequest, NextResponse } from "next/server";

function bytesToBase64(bytes: Uint8Array): string {
  // Edge runtime compatible base64 (no Node Buffer).
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

/**
 * Nonce-based CSP (A-grade hardening)
 *
 * Why middleware:
 * - next.config.js headers() are static and cannot safely generate a per-request nonce.
 * - Middleware lets us generate a strong nonce per request and pass it to the App Router layout.
 */
export function middleware(req: NextRequest) {
  // 128-bit nonce is sufficient; encode as base64 for CSP compatibility.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const nonce = bytesToBase64(bytes);

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://fonts.googleapis.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // Pass nonce to the server component tree via a request header.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Apply security headers to the response.
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

  return res;
}

// Avoid running middleware for Next.js static assets.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
