import Header from '@/src/components/sections/Header';
import AboutDetails from '@/src/components/sections/AboutDetails';
import AboutArt from '@/src/components/sections/AboutArt';
import AboutTeam from '@/src/components/sections/AboutTeam';
import Footer from '@/src/components/sections/Footer';

export default function AboutPage() {
  return <main className="relative min-h-screen bg-[#080808] font-inter text-white selection:bg-after-gold selection:text-black">
      <Header />
      <AboutDetails />
      <AboutArt />
      <AboutTeam />
      <Footer />
  </main> 
}