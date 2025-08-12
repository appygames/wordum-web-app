"use client";
import { useRouter } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { CrossIcon } from "../../../public/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CustomImage from "../Custom/CustomImage";
import SelectLevelButton from "../Custom/SelectLevelButton";

export default function LevelSelection({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  // const [level, setLevel] = useState("");
  const avatar = useSelector((state: RootState) => state.user.avatar);
  const level = useSelector((state: RootState) => state.game.difficulty);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#F4C9EC] flex flex-col items-center justify-center">
      <nav className="flex items-center justify-between w-full py-3 px-5 md:hidden">
        <div className="flex gap-2.5">
          <IoIosArrowBack
            size={32}
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => router.push("/")}
          />
          <CustomImage
            src={avatar ?? ''}
            width={80}
            height={80}
            alt="Avatar"
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => router.push("/profile")}
          />
        </div>
        <div>
          <IoSettingsOutline
            size={32}
            color="black"
            className="cursor-pointer"
            onClick={() => router.push("/settings")}
          />
        </div>
      </nav>
      <div className="w-80 m-auto flex flex-col items-center">
        <div className="close-icon cursor-pointer size-8" onClick={onClose}>
          <CrossIcon />
        </div>
        <div className="w-lg flex flex-col items-center gap-5 mb-32 md:mb-0 md:gap-4">
          <h2 className="text-black font-bold text-2xl mb-9 md:text-3xl md:mb-10">
            Choose your preferred level
          </h2>

          <SelectLevelButton level="easy" />
          <SelectLevelButton level="medium" />
          <SelectLevelButton level="hard" />
          <SelectLevelButton level="expert" />

          <button
            className={`h-16 w-full mt-5 max-w-80 text-xl rounded-lg font-bold cursor-pointer transition-all ${
              level
                ? "bg-[#EB598F] text-white"
                : "bg-[#B3B3B3] text-white cursor-not-allowed"
            }`}
            disabled={!level}
            onClick={() => router.push(`/game/play?level=${level}`)}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
}
