import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import fanta from "../assets/fanta.webp";
import cokeImg from "../assets/cocacola.webp";
import pepsiImg from "../assets/pepsi.webp";
import lemonImg from "../assets/lemon.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Products({ activeIndex = 0 }) {
    const refs = {
        lemonLeft: useRef(null),
        lemonRight: useRef(null),
        leftCan: useRef(null),
        rightCan: useRef(null),
    };

    const cans = [
        { name: "Fanta", img: fanta },
        { name: "Pepsi", img: pepsiImg },
        { name: "CocaCola", img: cokeImg },
    ];

    // Circular ordering logic
    const centerCan = cans[activeIndex];
    const leftCan = cans[(activeIndex - 1 + cans.length) % cans.length];
    const rightCan = cans[(activeIndex + 1) % cans.length];

    useEffect(() => {
        const { leftCan: leftRef, rightCan: rightRef, lemonLeft, lemonRight } = refs;

        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", handleLoad);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#products",
                start: "top 90%",
                end: "bottom 50%",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        // Animate only lemons and side cans
        tl.fromTo(
            lemonLeft.current,
            { rotate: "-90deg", x: "-50vw", y: "110vh", opacity: 0 },
            { rotate: "0deg", x: "0.8vw", y: "-10vh", opacity: 1, ease: "power2.out" },
            "start"
        )
            .fromTo(
                lemonRight.current,
                { rotate: "90deg", x: "100vw", y: "110vh", opacity: 0 },
                { rotate: "0deg", x: "-3.7vw", y: "-10vh", opacity: 1, ease: "power2.out" },
                "start"
            )
            .fromTo(
                leftRef.current,
                { rotate: "10deg", y: "110vh", opacity: 0 },
                { rotate: "0deg", y: "0vh", opacity: 1, scale: 0.85, ease: "power2.out" },
                "start"
            )
            .fromTo(
                rightRef.current,
                { rotate: "10deg", y: "110vh", opacity: 0 },
                { rotate: "0deg", y: "0vh", opacity: 1, scale: 0.85, ease: "power2.out" },
                "start"
            );

        return () => window.removeEventListener("load", handleLoad);
    }, [activeIndex]);

    return (
        <section
            id="products"
            className="relative flex flex-col md:flex-row items-center justify-center gap-[5vw] w-full min-h-screen bg-linear-to-br from-orange-400 to-orange-600 overflow-visible"
        >
            {/* Cards behind */}
            {[leftCan, centerCan, rightCan].map((can, idx) => (
                <div
                    key={can.name}
                    className={`group relative flex flex-col items-center justify-center gap-[2vh] w-[25vw] h-[70vh] mt-[23vh] bg-white rounded-2xl overflow-hidden transition-all duration-500 ${idx === 1 ? "z-5" : "z-0"
                        }`}
                >
                    <h1 className="mt-[40vh] text-[3vw] font-[Product_Sans]">{can.name}</h1>
                    <button className="text-white bg-orange-500 rounded-full py-[1vw] px-[2vw] border-none transition-all duration-300 group-hover:bg-orange-600">
                        Buy Now
                    </button>
                </div>
            ))}

            {/* Lemon images */}
            <img
                ref={refs.lemonLeft}
                src={lemonImg}
                className="absolute top-[5%] left-[10%] w-[22vw] opacity-70 z-5"
                alt="lemon-left"
            />
            <img
                ref={refs.lemonRight}
                src={lemonImg}
                className="absolute top-[5%] right-[10%] w-[22vw] opacity-70 z-5"
                alt="lemon-right"
            />

            {/* Can images on top */}
            <img
                ref={refs.leftCan}
                src={leftCan.img}
                className="absolute top-[10%] left-[5%] w-[30vw] z-10"
                alt={leftCan.name}
            />
            <img
                ref={refs.rightCan}
                src={rightCan.img}
                className="absolute top-[10%] right-[5%] w-[30vw] z-10"
                alt={rightCan.name}
            />
        </section>
    );
}
