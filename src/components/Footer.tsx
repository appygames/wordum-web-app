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
        <a href="#">
          <FontAwesomeIcon
            icon={faDiscord}
            className="text-white text-lg hover:text-[#00aced] transition-colors"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-white text-lg hover:text-[#00aced] transition-colors"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-white text-lg hover:text-[#00aced] transition-colors"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-white text-lg hover:text-[#00aced] transition-colors"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faTelegram}
            className="text-white text-lg hover:text-[#00aced] transition-colors"
          />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm mt-4">Copyright © Wordum</p>
    </footer>
  );
}
