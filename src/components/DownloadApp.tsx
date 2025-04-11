import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { FaApple } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa6";
import "../styles/download.css";


export default function DownloadApp(){
    return(
        <>
        <Header />
        <div className="download-app">
            <div className="content">
                <h2>DOWNLOAD THE APP<br />TO CONTINUE!</h2>
                <div className="store-buttons">
                    <button className="store-btn google">
                      <img src="icons/PlayStore.svg" alt="playstore" /> Play Store
                    </button>
                    <button className="store-btn apple">
                    <img src="icons/AppStore.svg" alt="appstore" /> App Store
                    </button>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}