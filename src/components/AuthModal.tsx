import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center tracking-widest text-foreground">
            BRIDGE
          </DialogTitle>
        </DialogHeader>

        {/* ↓↓↓ PASTE YOUR SIGN-IN / REGISTER CODE HERE ↓↓↓ */}
        <div className="flex items-center justify-center h-32 rounded-md border border-dashed border-border text-muted-foreground text-sm">
          Your sign-in / register UI goes here
        </div>
        {/* ↑↑↑ PASTE YOUR SIGN-IN / REGISTER CODE HERE ↑↑↑ */}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
