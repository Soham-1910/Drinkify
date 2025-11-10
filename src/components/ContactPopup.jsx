import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ContactPopup({ isOpen, onClose }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);

        try {
            await fetch("https://formsubmit.co/your@email.com", {
                method: "POST",
                body: formData,
            });
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Auto close after success popup
            setTimeout(() => {
                setIsSubmitted(false);
                onClose();
            }, 1500);
        } catch {
            setIsSubmitting(false);
            alert("❌ Something went wrong. Please try again!");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.div
                                key="form"
                                className="bg-[#0f0f0f]/90 text-white border border-white/10 p-6 rounded-2xl w-[90%] md:w-[380px] shadow-lg relative"
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <button
                                    onClick={onClose}
                                    className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-white"
                                >
                                    ×
                                </button>

                                <h2 className="text-2xl font-semibold mb-4 text-center">
                                    Contact Me
                                </h2>

                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-3"
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your Name"
                                        className="bg-[#1b1b1b] border border-white/20 p-2 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-white outline-none"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Your Email"
                                        className="bg-[#1b1b1b] border border-white/20 p-2 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-white outline-none"
                                    />
                                    <textarea
                                        name="message"
                                        rows="3"
                                        required
                                        placeholder="Your Message"
                                        className="bg-[#1b1b1b] border border-white/20 p-2 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-white outline-none resize-none"
                                    ></textarea>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`mt-2 py-2 rounded-lg font-semibold transition ${isSubmitting
                                            ? "bg-gray-600 cursor-not-allowed"
                                            : "bg-white text-black hover:bg-gray-200"
                                            }`}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="thankyou"
                                className="bg-[#0f0f0f]/90 text-white border border-white/10 p-6 rounded-2xl w-[90%] md:w-[350px] shadow-lg text-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <h2 className="text-2xl font-semibold mb-2">
                                    ✅ Thank You!
                                </h2>
                                <p>Your message has been sent successfully.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
