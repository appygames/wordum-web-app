import Link from "next/link";
import { FaHome, FaRedo } from "react-icons/fa";
import "../styles/common.css";
import { RxCross1 } from "react-icons/rx";

const GameOver = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <RxCross1 className="close-icon" onClick={onClose} />
        <div className="gameover-container">
          <div className="modal-box">
            <h2 className="gameover-title">GAME OVER</h2>
            <p className="gameover-subtitle">You are out of attempts</p>
          </div>
          <div className="button-row">
            <Link href="/game" className="icons-link">
              <FaRedo className="icon" />
            </Link>
            <Link href="/" className="icons-link">
              <FaHome className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
