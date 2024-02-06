import Container from "@/components/container";
import Filter from "@/components/filter";
import Hero from "@/components/home/hero";
import PopularCars from "@/components/home/popular-cars";
import RecommendedCars from "@/components/home/recommended-cars";

export default function Home() {


  
  return (
    <Container>
      <main className="flex flex-col gap-6">
        <Hero title={"React"}/>

        <Filter />

        <PopularCars />

        <RecommendedCars />
      </main>
    </Container>
  );
}
