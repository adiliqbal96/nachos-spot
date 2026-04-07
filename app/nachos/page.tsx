import Nav from "@/components/Nav";
import FoodBreak from "@/components/FoodBreak";
import Footer from "@/components/Footer";

export default function NachosPage() {
  return (
    <main className="relative bg-[#050404] min-h-screen overflow-hidden">
      <Nav />
      {/* Spacer for navigation */}
      <div className="h-20 lg:h-24" /> 
      <FoodBreak />
      <Footer />
    </main>
  );
}
