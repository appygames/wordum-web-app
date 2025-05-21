import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faTelegram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2258B9] text-white w-full hidden md:flex flex-col justify-between px-10 py-6 h-[220px]">
      {/* Links */}
      <div className="flex flex-col gap-3">
        <a href="#" className="font-bold text-sm hover:underline">
          PRIVACY POLICY
        </a>
        <Link
          href="/privacy-policy"
          className="font-bold text-sm hover:underline"
        >
          TERMS AND CONDITIONS
        </Link>
      </div>

      {/* Social icons */}
      <div className="flex gap-4 mt-2">
        <a
          href="https://discord.com/invite/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/discord-icon.svg"
            alt="Discord"
            className="h-5 w-5 hover:opacity-70 transition-opacity"
          />
        </a>
        <a
          href="https://www.instagram.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/insta-icon.svg"
            alt="Instagram"
            className="h-5 w-5 hover:opacity-70 transition-opacity"
          />
        </a>
        <a
          href="https://twitter.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/twitter.svg"
            alt="Twitter"
            className="h-5 w-5 hover:opacity-70 transition-opacity"
          />
        </a>
        <a
          href="https://www.facebook.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/facebook.svg"
            alt="Facebook"
            className="h-5 w-5 hover:opacity-70 transition-opacity"
          />
        </a>
        <a
          href="https://t.me/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/telegram.svg"
            alt="Telegram"
            className="h-5 w-5 hover:opacity-70 transition-opacity"
          />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm mt-4">Copyright © Wordum</p>
    </footer>
  );
}
