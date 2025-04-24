import { FaHome, FaRedo } from "react-icons/fa";
import "../styles/common.css";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetFeedback } from "@/features/feedback/feedbackSlice";

const GameWon = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const dispatch = useDispatch();
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
            <div
              onClick={() => {
                dispatch(resetFeedback());
                router.push("/game");
              }}
              className="icons-link"
            >
              <FaRedo className="icon" />
            </div>
            <div
              onClick={() => {
                dispatch(resetFeedback());
                router.push("/");
              }}
              className="icons-link"
            >
              <FaHome className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWon;
