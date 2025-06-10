"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaInstagram, FaFacebook, FaTelegram, FaDiscord} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
    <div className="flex flex-col items-center bg-[#F4C9EC] min-h-screen max-h-screen overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:block w-full">
        <Header />
      </div>

      {/* Main Settings Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center overflow-auto px-4 pt-3 pb-[95%] md:pt-10 md:pb-10 md:px-0">
        {/* Mobile Header */}
        <div className="flex items-center gap-4 mb-6 md:hidden self-start">
          <div onClick={() => router.push("/")}>
            <ArrowLeftIcon />
          </div>
          <h1 className="text-xl text-black font-semibold">Settings</h1>
        </div>

        {/* Title for Desktop */}
        <h1 className="text-3xl font-extrabold text-black mb-6 hidden md:block">
          Settings
        </h1>

        {/* Settings content */}
        <div className="space-y-6 w-full md:w-[28rem] font-extrabold text-xl">
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

          {["Language", "Help"].map((item) => (
            <button
              key={item}
              className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-xl shadow"
            >
              {item}
            </button>
          ))}

          {/* Show Privacy Policy only on mobile */}
          <button className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-xl shadow md:hidden">
            Privacy Policy
          </button>
        </div>

        {/* Social Icons - mobile only */}
        <div className="flex justify-center space-x-4 mt-8 md:hidden">
          {[FaDiscord, FaInstagram, FaFacebook, FaXTwitter, FaTelegram].map((Icon, i) => (
            <div key={i} className="bg-white p-2 rounded-full">
              <Icon className="text-xl text-[#2258B9]" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block w-full">
        <Footer />
      </div>
    </div>
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
