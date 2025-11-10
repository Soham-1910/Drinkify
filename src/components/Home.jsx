import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

import fanta from "../assets/fanta.webp";
import pepsi from "../assets/pepsi.webp";
import cocacola from "../assets/cocacola.webp";
import orange from "../assets/orange.webp";
import orangeCut from "../assets/orange2.webp";
import leaf from "../assets/leaf.webp";
import leaf2 from "../assets/leaf2.webp";
import leaf3 from "../assets/coconoutleaf.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ activeIndex, setActiveIndex }) {
    const cans = [
        { src: fanta, width: "36%", top: "12%", left: "32%" },
        { src: pepsi, width: "36%", top: "12%", left: "32%" },
        { src: cocacola, width: "36%", top: "12%", left: "32%" },
    ];

    const refs = {
        can: useRef(null),
        orangeCut: useRef(null),
        orange: useRef(null),
        leaf1: useRef(null),
        leaf2: useRef(null),
    };

    // Slide + fade animation
    const animateCanChange = (newIndex, direction = "next") => {
        const img = refs.can.current;
        if (!img) return;
        const offset = direction === "next" ? 100 : -100;

        gsap.to(img, {
            xPercent: -offset,
            opacity: 0,
            duration: 0.4,
            ease: "power1.in",
            onComplete: () => {
                img.src = cans[newIndex].src; // update src directly
                setActiveIndex(newIndex);
                gsap.set(img, { xPercent: offset, opacity: 0 });
                gsap.to(img, { xPercent: 0, opacity: 1, duration: 0.4, ease: "power1.out" });
            },
        });
    };

    const nextSlide = () => animateCanChange((activeIndex + 1) % cans.length, "next");
    const prevSlide = () => animateCanChange((activeIndex - 1 + cans.length) % cans.length, "prev");

    useEffect(() => {
        const { can, orangeCut, orange, leaf1, leaf2 } = refs;
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", handleLoad);

        // GSAP scroll animations
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        tl1.to(can.current, { y: "100vh", x: "-27vw", scale: 0.95, ease: "none" }, "move")
            .to(orangeCut.current, { y: "148vh", x: "-7vw", scale: 0.9, ease: "none" }, "move")
            .to(orange.current, { y: "105vh", x: "20vw", scale: 0.9, ease: "none" }, "move")
            .to(leaf1.current, { y: "105vh", x: "80vw", rotate: "130deg", ease: "none" }, "move")
            .to(leaf2.current, { y: "35vh", x: "-78vw", rotate: "130deg", ease: "none" }, "move");

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: "#products",
                start: "top 95%",
                end: "bottom-=100 60%",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        tl2.to(can.current, { y: "225vh", x: "8vw", scale: 0.7, ease: "none" }, "center")
            .to(orangeCut.current, { y: "218vh", x: "15.5vw", scale: 1, ease: "none" }, "center");

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <section
            id="home"
            className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-orange-400 to-orange-600 overflow-visible"
        >
            <h1 className="absolute text-[25vw] font-[Product_Sans] font-extrabold text-white z-30 leading-none">
                FANTA
            </h1>

            {/* Active Can */}
            <img
                ref={refs.can}
                src={cans[activeIndex].src}
                alt="Drink Can"
                style={{
                    width: "36%",
                    top: "12%",
                    left: "32%",
                    position: "absolute",
                }}
                className="z-50"
            />

            {/* Decorative Images */}
            <img
                ref={refs.orangeCut}
                src={orangeCut}
                alt="Orange Cut"
                className="absolute top-[2%] left-[30%] w-[18%] z-30"
            />
            <img
                ref={refs.orange}
                src={orange}
                alt="Orange"
                className="absolute top-[55%] right-[30%] w-[20%] z-35"
            />
            <img
                ref={refs.leaf1}
                src={leaf}
                alt="Leaf"
                className="absolute top-[10%] left-[0%] rotate-60 w-[18%] z-30"
            />
            <img
                ref={refs.leaf2}
                src={leaf2}
                alt="Leaf2"
                className="absolute top-[70%] left-[80%] -rotate-90 w-[12%] z-30"
            />
            <img
                src={leaf3}
                alt="Leaf3"
                className="absolute top-[10%] right-[0%] w-[20%] z-30"
            />

            {/* Navigation Arrows */}
            <div className="absolute bottom-[8%] flex gap-10 z-50">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition"
                >
                    <ChevronLeft className="text-black w-8 h-8" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition"
                >
                    <ChevronRight className="text-black w-8 h-8" />
                </button>
            </div>
        </section>
    );
}
