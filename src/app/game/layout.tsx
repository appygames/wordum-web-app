// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  // const pathname = usePathname(); 
  // const hideLayout = pathname.startsWith("/game"); 

  return (
  <>
       
        <main className="main-content">{children}</main>
      
  </> 
  );
}