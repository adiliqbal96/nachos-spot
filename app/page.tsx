import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FallingNachos from "@/components/FallingNachos";
import FoodBreak from "@/components/FoodBreak";
import Drinks from "@/components/Drinks";
import Events from "@/components/Events";
import Statement from "@/components/Statement";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#050404] min-h-screen overflow-hidden">
      <FallingNachos />
      <Nav />
      <Hero />
      <FoodBreak />
      <Drinks />
      <Events />
      <Statement />
      <Booking />
      <Footer />
    </main>
  );
}
