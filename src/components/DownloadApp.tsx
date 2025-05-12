import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DownloadApp() {
  return (
    <>
      <Header />
      <div className="bg-[#75fdfd] flex flex-col items-center justify-center min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-284px)]">
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-2xl text-center md:text-4xl text-[#004C6B] font-bold">
            DOWNLOAD THE APP
            <br />
            TO CONTINUE!
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="flex items-center gap-2 bg-white rounded-md py-3 px-5 font-bold shadow-lg transition-all duration-300 hover:scale-105 text-[#1e88e5]">
              <img src="/icons/PlayStore.svg" alt="playstore" className="h-9" />{" "}
              Play Store
            </button>
            <button className="flex items-center gap-2 bg-white rounded-md py-3 px-5 font-bold shadow-lg transition-all duration-300 hover:scale-105 text-black">
              <img src="/icons/AppStore.svg" alt="appstore" className="h-9" />{" "}
              App Store
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
