import React, { useState } from "react";
import "../styles/resume.css";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import HowToPlay from "./HowToPlay";

function Resume({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <RxCross1 className="close-icon" onClick={onClose} />
        <div className="resume-container">
          <button onClick={onClose}>RESUME</button>
          <button onClick={() => setShowModal(true)}>HOW TO PLAY?</button>
          <button onClick={() => router.push("/game")}>CHANGE LEVEL</button>
          <button onClick={() => router.push("/game")}>EXIT</button>
        </div>
      </div>
      <HowToPlay open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default Resume;
