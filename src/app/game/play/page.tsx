import GameBoard from "@/components/GameBoard";
import { Difficulty } from "@/features/game/gameSlice";

export default function PlayPage({
  searchParams,
}: {
  searchParams: { level?: Difficulty };
}) {
  const level = searchParams.level || "easy";

  return <GameBoard level={level} />;
}
