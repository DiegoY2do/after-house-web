import Header from "@/src/components/sections/Header";
import Hero from "@/src/components/sections/Hero";
import Services from "@/src/components/sections/Services";
import About from "@/src/components/sections/About";
import Favorites from "@/src/components/sections/Favorites";
import ParallaxDivider from "@/src/components/sections/ParallaxDivider";
import Experience from "@/src/components/sections/Experience";
import Testimonials from "@/src/components/sections/Testimonials";
import BookingSection from "@/src/components/sections/BookingSection";
import Footer from "@/src/components/sections/Footer";
import BrandMarquee from "@/src/components/sections/BrandMarquee";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Header/>
      <Hero/>
      <Services/>
      <About/>
      <Favorites/>
      <ParallaxDivider/>
      <Experience/>
      <Testimonials/>
      <BrandMarquee/>
      <BookingSection/>
      <Footer/>
    </main>
  );
}