import Header from "@/src/components/sections/Header";
import FavoriteDetail from "@/src/components/sections/FavoriteDetail";
import Footer from "@/src/components/sections/Footer";
import MoreFavorites from "@/src/components/sections/MoreFavorites";

export default async function CocktailPage({ 
  params 
}: { 
  params: Promise<{ id: string, locale: string }> 
}) {
  const resolvedParams = await params;
  
  return (
    <main className="relative min-h-screen bg-[#080808] font-inter text-white selection:bg-after-gold selection:text-black">
    <Header/>
    <FavoriteDetail cocktailId={resolvedParams.id} />
    <MoreFavorites currentId={resolvedParams.id} />
    <Footer/>
    </main>
  );
}