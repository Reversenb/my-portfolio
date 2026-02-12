import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0b0f19]">
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}