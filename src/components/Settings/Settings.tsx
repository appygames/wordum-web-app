"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaFacebook, FaTelegram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowLeftIcon } from "../../../public/icons";
import { cn } from "@/utils/utils";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function SettingsPage() {
  const router = useRouter();
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const storedSound = localStorage.getItem("sound");
    if (storedSound !== null) {
      setSound(storedSound === "true");
    }
  }, []);

  const handleSoundChange = () => {
    setSound(!sound);
    localStorage.setItem("sound", (!sound).toString());
  };

  const staticButtons = ["Language", "Help"];

  return (
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
      <header className="hidden md:block w-full">
        <Header />
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center overflow-auto px-4 pt-3 pb-[95%] md:pt-10 md:pb-10 md:px-0">
        <div className="flex items-center gap-4 mb-6 md:hidden self-start">
          <button onClick={() => router.push("/")}>
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl text-black font-semibold">Settings</h1>
        </div>

        <h1 className="text-3xl font-extrabold text-black mb-6 hidden md:block">
          Settings
        </h1>

        <section className="space-y-6 w-full md:w-[28rem] font-extrabold text-xl">
          <SettingToggle
            label="Sound"
            enabled={sound}
            onToggle={() => handleSoundChange()}
          />
          <SettingToggle
            label="Notifications"
            enabled={notifications}
            onToggle={() => setNotifications(!notifications)}
          />

          {staticButtons.map((item) => (
            <StaticButton key={item} label={item} />
          ))}

          <StaticButton label="Privacy Policy" className="md:hidden" />
        </section>

        <div className="flex justify-center space-x-4 mt-8 md:hidden">
          {[FaDiscord, FaInstagram, FaFacebook, FaXTwitter, FaTelegram].map(
            (Icon, i) => (
              <div key={i} className="bg-white p-2 rounded-full">
                <Icon className="text-xl text-[#2258B9]" />
              </div>
            )
          )}
        </div>
      </main>

      <footer className="hidden md:block w-full">
        <Footer />
      </footer>
    </div>
  );
}

// Toggle Switch Component
function SettingToggle({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-[#2258B9] text-white px-4 py-3 rounded-xl shadow">
      <span>{label}</span>
      <button
        onClick={onToggle}
        className={cn(
          "w-12 min-h-6 p-0.5 rounded-full relative transition-all duration-300 border-4 border-white flex items-center",
          enabled ? "justify-end" : "justify-start"
        )}
      >
        <span className="w-4 h-4 rounded-full bg-white transition-transform duration-300" />
      </button>
    </div>
  );
}

// Reusable Button Component
function StaticButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-xl shadow",
        className
      )}
    >
      {label}
    </button>
  );
}
