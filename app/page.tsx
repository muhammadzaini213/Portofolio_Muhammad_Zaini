import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Featured } from "./components/Featured";
import { Articles } from "./components/Articles";
import { Projects } from "./components/Projects";
import { Contacts } from "./components/Contacts";
import { Footer } from "./components/Footer";

export default function Home() {

  return (
    <main className="bg-[#2d2d2d] text-white">

      <Navbar/>
      <Hero/>
      <About/>
      <Featured/>
      <Projects/>
      <Articles/>
      <Contacts/>
      <Footer/>
    </main>
  );
}