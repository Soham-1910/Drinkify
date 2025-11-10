import { Menu } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const handleScroll = (sectionId) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${sectionId}` }, // fixed template literal
      ease: "power2.out",
    });
  };

  return (
    <nav className="fixed flex items-center justify-between w-full h-[10vh] px-[10vw] z-50 text-white bg-transparent">
      <button
        onClick={() => handleScroll("home")}
        className="text-lg font-[Product_Sans] font-bold"
      >
        DRINKIFY
      </button>

      <div className="hidden md:flex gap-[3vw]">
        <button onClick={() => handleScroll("home")}>Home</button>
        <button onClick={() => handleScroll("about")}>About</button>
        <button onClick={() => handleScroll("products")}>Products</button>
      </div>

      <Menu className="block md:hidden w-6 h-6" />
    </nav>
  );
}
