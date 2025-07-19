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
    "inevitable",
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
      <div className="bg-[#F4C9EC] flex flex-col items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-296px)] px-4">
        {/* Card Container */}
        <div className="relative w-[334px] md:w-[224px] h-[587px] md:h-[400px]">
          {/* Card Image */}
           <img
            src="/images/Card.png"
            alt="Card Background"
            className="object-cover rounded-xl bg-transparent"
          />

          {/* Text Over Image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            {loading ? (
              <p className="text-xl font-semibold text-black">Loading...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-black mb-[5rem]">
                  {word}
                </h2>
                <p className="mt-2 text-lg text-black mb-[3rem]">
                  {definition}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
