/**
 * Shared body scroll lock to avoid competing effects (e.g. mobile menu + overlay).
 * Uses a keyed lock set so multiple features can lock concurrently without
 * accidentally unlocking each other.
 */
const locks = new Set<string>();
let previousOverflow: string | null = null;

function isBrowser(): boolean {
  return typeof document !== "undefined";
}

export function lockBodyScroll(lockId: string): void {
  if (!isBrowser()) return;

  if (!locks.has(lockId)) {
    locks.add(lockId);
  }

  // First lock captures the prior inline style so we can restore it later.
  if (locks.size === 1) {
    previousOverflow = document.body.style.overflow;
  }

  document.body.style.overflow = "hidden";
}

export function unlockBodyScroll(lockId: string): void {
  if (!isBrowser()) return;

  if (locks.has(lockId)) {
    locks.delete(lockId);
  }

  if (locks.size === 0) {
    document.body.style.overflow = previousOverflow ?? "";
    previousOverflow = null;
  }
}
