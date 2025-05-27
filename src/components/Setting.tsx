"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaFacebook, FaTelegram, FaDiscord } from "react-icons/fa";
import { ArrowLeftIcon } from "../../public/icons";
import { cn } from "@/utils/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedSound = localStorage.getItem("sound");
    if (storedSound !== null) {
      setSound(storedSound === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sound", String(sound));
  }, [sound]);

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Settings Page */}
      <div className="w-full h-screen bg-[#F4C9EC] p-4 flex flex-col md:hidden">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div onClick={() => router.push("/")}>
            <ArrowLeftIcon />
          </div>
          <h1 className="text-xl text-black font-semibold">Settings</h1>
        </div>

        {/* Toggles */}
        <div className="space-y-4 mb-6">
          <SettingToggle
            label="Sound"
            enabled={sound}
            onToggle={() => setSound(!sound)}
          />
          <SettingToggle
            label="Notifications"
            enabled={notifications}
            onToggle={() => setNotifications(!notifications)}
          />
        </div>

        {/* Navigation Options */}
        <div className="space-y-4 mb-6">
          {["Language", "Help", "Privacy Policy"].map((item) => (
            <button
              key={item}
              className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-b-sm shadow"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4">
          <div className="bg-white p-2 rounded-full">
            <FaDiscord className="text-xl text-[#2258B9]" />
          </div>
          <div className="bg-white p-2 rounded-full">
            <FaInstagram className="text-xl text-[#2258B9]" />
          </div>
          <div className="bg-white p-2 rounded-full">
            <FaFacebook className="text-xl text-[#2258B9]" />
          </div>
          <div className="bg-white p-2 rounded-full">
            <FaTelegram className="text-xl text-[#2258B9]" />
          </div>
        </div>
      </div>

      {/* Desktop Settings Page */}
      <div className="hidden md:flex flex-col items-center bg-[#F4C9EC] h-[60%] p-10">
        <h1 className="text-3xl font-extrabold text-black mb-6">Settings</h1>

        <div className="space-y-6 w-[28rem] font-extrabold text-xl">
          <SettingToggle
            label="Sound"
            enabled={sound}
            onToggle={() => setSound(!sound)}
          />
          <SettingToggle
            label="Notifications"
            enabled={notifications}
            onToggle={() => setNotifications(!notifications)}
          />
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-xl shadow">
            Language
          </button>
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-xl shadow">
            Help
          </button>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}

// Toggle Component
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
