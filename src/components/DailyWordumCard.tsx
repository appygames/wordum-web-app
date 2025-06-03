"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DailyWordumCard() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [loading, setLoading] = useState(true);

  const words = [
    "serendipity",
    "ephemeral",
    "resilience",
    "eloquent",
    "benevolent",
  ];

  useEffect(() => {
    const fetchDefinition = async () => {
      setLoading(true);
      const randomWord = words[Math.floor(Math.random() * words.length)];
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
        );
        const data = await res.json();

        const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
        setWord(randomWord);
        setDefinition(meaning || "No definition found.");
      } catch (error) {
        console.log(error);
        setWord(randomWord);
        setDefinition("Failed to fetch definition.");
      } finally {
        setLoading(false);
      }
    };

    fetchDefinition();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-[#F4C9EC] flex flex-col items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-284px)]">
        <div className="absolute text-center mt-[-200px] px-4">
          {loading ? (
            <p className="text-xl font-semibold">Loading...</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{word}</h2>
              <p className="mt-2 text-lg">{definition}</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
