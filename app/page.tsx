import Chatbot from "@/components/Chatbot";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import EnhancedTestimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyCooseUs";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <HowItWorks/>
      <WhyChooseUs/>
      <EnhancedTestimonials/>
      <Contact/>
      <Chatbot/>
    </div>
  );
}
