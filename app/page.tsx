import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Statement from "@/components/Statement";
import Menu from "@/components/Menu";
import FoodBreak from "@/components/FoodBreak";
import Events from "@/components/Events";
import Booking from "@/components/Booking";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Statement />
      <Menu />
      <FoodBreak />
      <Events />
      <Booking />
      <Social />
      <Footer />
    </>
  );
}
