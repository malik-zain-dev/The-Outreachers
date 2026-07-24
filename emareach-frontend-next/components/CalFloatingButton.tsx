"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initCalFloatingButton,
  removeCalFloatingButton,
  shouldHideCalFloatingButton,
} from "@/lib/cal-embed";

export function CalFloatingButton() {
  const pathname = usePathname();
  const hidden = shouldHideCalFloatingButton(pathname);

  useEffect(() => {
    if (hidden) {
      removeCalFloatingButton();
      return;
    }

    initCalFloatingButton();

    return () => {
      removeCalFloatingButton();
    };
  }, [hidden]);

  return null;
}
