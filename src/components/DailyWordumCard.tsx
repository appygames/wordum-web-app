import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DailyWordumCard() {
  return (
    <>
      <Header />
      <div className="bg-[#F4C9EC] flex flex-col items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-284px)]">
        <img
          src="/images/Card.svg"
          alt="Wordum Card"
          className="w-[400px] h-[569px] md:w-[400px] md:h-[370px]"
        />
      </div>
      <Footer />
    </>
  );
}
