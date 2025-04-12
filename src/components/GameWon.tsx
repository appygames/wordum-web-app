import Link from "next/link";
import { FaHome, FaRedo } from "react-icons/fa";
import "../styles/common.css";
import { RxCross1 } from "react-icons/rx";

const GameWon = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <RxCross1 className="close-icon" onClick={onClose} />
        <div className="gameover-container">
          <div className="modal-box">
            <h2 className="modal-title gamewon-title">YOU WIN</h2>
            <p className=" gamewon-subtitle">
              You suceesfully found all four words
              <br />
              Coins earned
            </p>
          </div>
          <div className="empty-div"></div>
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

export default GameWon;
