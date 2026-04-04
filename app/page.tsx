import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FoodBreak from "@/components/FoodBreak";
import Events from "@/components/Events";
import Drinks from "@/components/Drinks";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#050404] min-h-screen overflow-hidden">
      <Nav />
      <Hero />
<FoodBreak />
      <Events />
      <Drinks />
      <Booking />
      <Footer />
    </main>
  );
}
