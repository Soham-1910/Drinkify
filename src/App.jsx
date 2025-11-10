// App.jsx
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import { useRef, useState } from "react";
import "./index.css";

export default function App() {
  const aboutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // lift state here

  return (
    <div id="main" className="bg-orange-600 font-[Product_Sans]">
      <Navbar />
      <Home aboutRef={aboutRef} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <About ref={aboutRef} />
      <Products activeIndex={activeIndex} />
    </div>
  );
}
