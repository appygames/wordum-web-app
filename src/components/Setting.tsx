// components/SettingsPage.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaArrowLeft,
  FaInstagram,
  FaFacebook,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa";

export default function SettingsPage() {
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-[#F4C9EC] p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <FaArrowLeft
          className="text-xl mr-2 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <h1 className="text-xl font-semibold">Settings</h1>
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
            className="w-full text-left bg-[#2258B9] text-white py-3 px-4 rounded-xl shadow"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-4 mt-auto">
        <FaInstagram className="text-xl text-gray-700" />
        <FaFacebook className="text-xl text-gray-700" />
        <FaTelegram className="text-xl text-gray-700" />
        <FaDiscord className="text-xl text-gray-700" />
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
    <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-3 rounded-xl shadow">
      <span>{label}</span>
      <button
        onClick={onToggle}
        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
          enabled ? "bg-green-400" : "bg-gray-400"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
