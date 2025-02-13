"use client";
import React, { ReactNode, useState, cloneElement, Children } from "react";
import { createPortal } from "react-dom";
import { useWallet } from "../contexts/WalletContext";
import { ConnectWalletPopup } from "./ConnectWalletPopup";

interface RequireWalletProps {
  children: ReactNode;
  onAction?: () => void;
}

interface EnhancedElementProps {
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const RequireWallet = ({ children, onAction }: RequireWalletProps) => {
  const { wallet } = useWallet();
  const [showPopup, setShowPopup] = useState(false);

  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!wallet) {
      e.preventDefault();
      e.stopPropagation();
      setShowPopup(true);
      return;
    }
    onAction?.();
  };

  // Clone the child element and add our handlers
  const child = Children.only(
    children
  ) as React.ReactElement<EnhancedElementProps>;
  const enhancedChild = cloneElement(child, {
    ...child.props,
    onClick: handleInteraction,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleInteraction(e);
      }
    },
  });

  return (
    <>
      {enhancedChild}
      {typeof window !== "undefined" &&
        showPopup &&
        createPortal(
          <ConnectWalletPopup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
          />,
          document.body
        )}
    </>
  );
};
