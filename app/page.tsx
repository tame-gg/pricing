import Hero from "@/components/Hero";
import Demos from "@/components/Demos";
import Pricing from "@/components/Pricing";
import Maintenance from "@/components/Maintenance";
import Process from "@/components/Process";
import WhyTame from "@/components/WhyTame";
import FinePrint from "@/components/FinePrint";
import CheckoutBuilder from "@/components/CheckoutBuilder";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <div className="section-divider my-2" />
      <Demos />
      <div className="section-divider my-2" />
      <Pricing />
      <div className="section-divider my-2" />
      <Maintenance />
      <div className="section-divider my-2" />
      <Process />
      <div className="section-divider my-2" />
      <WhyTame />
      <div className="section-divider my-2" />
      <FinePrint />
      <div className="section-divider my-2" />
      <CheckoutBuilder />
      <div className="section-divider my-2" />
      <Contact />
      <Footer />
    </main>
  );
}
