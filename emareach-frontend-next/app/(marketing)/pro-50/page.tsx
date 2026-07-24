import { redirect } from "next/navigation";

/**
 * Short link: /pro-50 -> /pricing/pro-50 so users land on the Pro 50 plan page
 * and can open Razorpay/Lemon checkout (same as pricing page).
 */
export default function Pro50Redirect() {
  redirect("/pricing/pro-50");
}
