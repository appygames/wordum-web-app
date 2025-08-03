import GameBoard from "@/components/Playground/GameBoard";
import { Difficulty } from "@/features/game/gameSlice";

type PageProps = {
  searchParams?: Promise<{
    level?: Difficulty;
  }>;
};

export default async function PlayPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const level: Difficulty = resolvedParams?.level ?? "easy";

  return <GameBoard level={level} />;
}
