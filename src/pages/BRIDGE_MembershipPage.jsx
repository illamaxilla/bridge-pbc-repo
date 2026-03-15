import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { BRIDGEAuthModal } from "@/components/AuthModal";
import { BRIDGEFreeMemberModal, BRIDGEPaidMemberModal } from "@/components/MembershipModals";
import MembershipPageV4 from "./BRIDGE_Membership_v4";

/* ─────────────────────────────────────────────────────────────
   BRIDGE Membership Page — production wrapper
   Wires v4 membership page with Layout, auth context, and modals.
───────────────────────────────────────────────────────────────── */
export default function BRIDGEMembershipPage() {
  const { user } = useAuth();

  // Auth modal (for unauthenticated users)
  const [authOpen, setAuthOpen] = useState(false);

  // Membership modals
  const [freeOpen, setFreeOpen] = useState(false);
  const [intelOpen, setIntelOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);

  // CTA handlers — if user isn't signed in, show auth modal first
  const handleApplyFree = () => {
    if (!user) { setAuthOpen(true); return; }
    setFreeOpen(true);
  };

  const handleApplyPaid = () => {
    if (!user) { setAuthOpen(true); return; }
    setIntelOpen(true);
  };

  const handleApplyInvestor = () => {
    if (!user) { setAuthOpen(true); return; }
    setInvestorOpen(true);
  };

  return (
    <Layout>
      <MembershipPageV4
        onApplyFree={handleApplyFree}
        onApplyPaid={handleApplyPaid}
        onApplyInvestor={handleApplyInvestor}
      />

      {/* Auth modal — sign in / request access */}
      <BRIDGEAuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab="signin"
      />

      {/* Free membership application modal */}
      <BRIDGEFreeMemberModal
        isOpen={freeOpen}
        onClose={() => setFreeOpen(false)}
      />

      {/* Intelligence tier ($250/yr) */}
      <BRIDGEPaidMemberModal
        isOpen={intelOpen}
        onClose={() => setIntelOpen(false)}
        tier="Intelligence"
        onApplyFreeInstead={() => { setIntelOpen(false); setFreeOpen(true); }}
      />

      {/* Investor tier ($1,000/yr) */}
      <BRIDGEPaidMemberModal
        isOpen={investorOpen}
        onClose={() => setInvestorOpen(false)}
        tier="Investor"
        onApplyFreeInstead={() => { setInvestorOpen(false); setFreeOpen(true); }}
      />
    </Layout>
  );
}
