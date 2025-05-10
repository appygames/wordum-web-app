import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faTelegram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#004c6b] p-5  fixed bottom-0 w-full hidden md:flex flex-col gap-4 text-left">
      <div className="flex flex-col">
        <a href="#" className="font-bold text-xl hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="font-bold text-xl hover:underline">
          Terms and Conditions
        </a>
      </div>
      <div className="flex gap-2">
        <a href="#">
          <FontAwesomeIcon
            icon={faDiscord}
            className="size-4 transition-colors ease-in-out duration-300 hover:text-[#00aced]"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faFacebook}
            className="size-4 transition-colors ease-in-out duration-300 hover:text-[#00aced]"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faTwitter}
            className="size-4 transition-colors ease-in-out duration-300 hover:text-[#00aced]"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faInstagram}
            className="size-4 transition-colors ease-in-out duration-300 hover:text-[#00aced]"
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faTelegram}
            className="size-4 transition-colors ease-in-out duration-300 hover:text-[#00aced]"
          />
        </a>
      </div>
      <p className="text-sm mt-2">Copyright © Wordum</p>
    </footer>
  );
}
