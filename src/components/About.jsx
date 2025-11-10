export default function About() {
    return (
        <section
            id="about"
            className="relative z-1 w-full h-screen bg-[#4d231c] flex"
        >
            {/* Left SVG blob */}
            <div className="flex items-center justify-center w-1/2 h-full">
                <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[80%] translate-y-[10%]"
                >
                    <path
                        fill="#e04428"
                        d="M41.5,-59.5C49.8,-51.1,49.7,-33.6,50.7,-19.2C51.7,-4.7,53.8,6.7,52.4,18.9C51.1,31.1,46.3,44.1,36.9,52.9C27.6,61.8,13.8,66.5,-2.5,70C-18.8,73.4,-37.7,75.6,-52.5,68.5C-67.3,61.5,-78.2,45.2,-84.5,27.1C-90.9,9,-92.7,-10.8,-80.5,-19.3C-68.3,-27.8,-42.1,-24.8,-26.3,-30.8C-10.6,-36.8,-5.3,-51.7,5.7,-59.5C16.6,-67.3,33.2,-68,41.5,-59.5Z"
                        transform="translate(100 100)"
                    />
                </svg>
            </div>

            {/* Right Info */}
            <div className="flex flex-col justify-center gap-[4vh] w-1/2 text-white px-10">
                <h1 className="text-[4.5vw] font-[Product_Sans_B] leading-tight ">
                    Flavour Updated
                </h1>
                <p className="text-[1vw] leading-relaxed w-[80%] opacity-90">
                    Dive into the refreshing world of Fanta — where bold flavor meets
                    vibrant fun! Bursting with fruity energy, Fanta brings a twist of joy
                    in every sip. From zesty oranges to tropical vibes, each flavor is
                    crafted to make your moments sparkle. Because when life gives you
                    fruit, we make it fantastic!
                </p>
            </div>
        </section>
    );
}
