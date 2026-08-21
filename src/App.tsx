import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LegalModal from "./components/LegalModal";

/**
 * Academic Support Hub — single-page marketing site.
 * Legal, ethics-first academic assistance: coaching, editing, feedback,
 * and formatting support. Students always submit their own work.
 */
export default function App() {
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);

  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact openLegal={setLegal} />
      </main>
      <Footer openLegal={setLegal} />
      <LegalModal doc={legal} onClose={() => setLegal(null)} />
    </div>
  );
}
