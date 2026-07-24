"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  removeCalFloatingButton,
  shouldHideCalFloatingButton,
} from "@/lib/cal-embed";

/** Removes the Cal floating button when navigating to app/auth routes. */
export function CalFloatingButtonGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldHideCalFloatingButton(pathname)) {
      removeCalFloatingButton();
    }
  }, [pathname]);

  return null;
}
