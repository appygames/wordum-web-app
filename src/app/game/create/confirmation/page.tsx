"use client";

import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModalPage";

export default function ConfirmationPage() {
  const router = useRouter();

  const handleConfirm = () => {
    // Do something meaningful like submitting data
    router.push("/"); // or any next page
  };

  const handleClose = () => {
    router.back(); // or router.push("/game/create") to go back
  };

  return (
    <ConfirmationModal onClose={handleClose} onConfirm={handleConfirm} grid={[]} />
  );
}
