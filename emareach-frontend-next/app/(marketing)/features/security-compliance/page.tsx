import type { Metadata } from "next";
import { SecurityCompliancePage as SecurityComplianceContent } from "@/components/features/SecurityCompliancePage";

export const metadata: Metadata = {
  title: "Security & Compliance | EmaReach Features",
  description:
    "Explore Security & Compliance with detailed controls for data protection, access governance, compliance-aware workflows, and secure outbound operations.",
};

export default function SecurityCompliancePage() {
  return <SecurityComplianceContent />;
}
