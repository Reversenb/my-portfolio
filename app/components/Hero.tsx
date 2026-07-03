'use client';

import { motion, type Variants } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useEffect, useRef, useState, type JSX } from "react";

// Icons
import { Github, Instagram, ArrowRight, ChevronDown } from "lucide-react";

// ✅ Import 3D Keyboard
import KeyboardCanvas from "./3d/KeyboardCanvas";

const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer: Variants = {
    animate: { transition: { staggerChildren: 0.1 } },
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

export function Hero(): JSX.Element {
    const isMobile = useMediaQuery("(max-width: 768px)")

    // ===== Typewriter (loop) for the small snippet =====
    const SNIPPET = `const aboutMe: Thanabodee Sahakongsin = { ... }`
    const [typed, setTyped] = useState("")
    const [blink, setBlink] = useState(false)

    const typeIndexRef = useRef(0)
    const deletingRef = useRef(false)
    const typerTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        function schedule(nextDelay: number) {
            typerTimeoutRef.current = setTimeout(step, nextDelay)
        }
        function step() {
            if (!deletingRef.current) {
                typeIndexRef.current++
                setTyped(SNIPPET.slice(0, typeIndexRef.current))
                if (typeIndexRef.current >= SNIPPET.length) {
                    deletingRef.current = true
                    schedule(1200)
                    return
                }
                schedule(50)
            } else {
                typeIndexRef.current--
                setTyped(SNIPPET.slice(0, typeIndexRef.current))
                if (typeIndexRef.current <= 0) {
                    deletingRef.current = false
                    typeIndexRef.current = 0
                    schedule(500)
                    return
                }
                schedule(35)
            }
        }
        schedule(300)
        const blinkId = setInterval(() => setBlink((b) => !b), 500)
        return () => {
            if (typerTimeoutRef.current) clearTimeout(typerTimeoutRef.current)
            clearInterval(blinkId)
        }
    }, [])

    return (
        <motion.section
            id="home"
            className="hero relative overflow-hidden min-h-screen flex items-center pt-[100px] pb-20 px-[5%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Background Glow Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div
                className="hero-container relative z-10 w-full max-w-[1400px] mx-auto"
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                    alignItems: "start",
                    gap: "4rem",
                }}
            >
                {/* ===== Left: Content & Keyboard ===== */}
                <motion.div
                    className="hero-content flex flex-col justify-between h-full"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <div>
                        <motion.div className="hero-badge inline-block px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-md border border-white/20">
                            <span className="text-sm font-medium"> 👋Hello, I'm </span>
                        </motion.div>

                        <motion.h1
                            className="glitch text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                        >
                            Thanabodee
                        </motion.h1>

                        <motion.h2 className="hero-subtitle text-2xl md:text-3xl text-[var(--accent-color)] mb-6 font-semibold" variants={fadeInUp}>
                            Computer Science Student RMUTI
                        </motion.h2>

                        <motion.p className="hero-description text-lg text-gray-300 mb-8 leading-relaxed max-w-xl" variants={fadeInUp}>
                            Hello, I'm Thanabodee Sahakongsin a curious mind with a passion for technology,
                            creativity, and constant growth. Whether it's coding, solving problems, or learning
                            something new.
                        </motion.p>

                        <motion.div className="cta-buttons flex flex-wrap gap-4 mb-8" variants={staggerContainer}>
                            <motion.a
                                href="#projects"
                                className="cta-primary px-8 py-3 bg-white text-blue-900 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View My Projects
                                <ArrowRight size={20} />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="cta-secondary px-8 py-3 border border-white/30 bg-white/5 backdrop-blur-sm rounded-full font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>

                        <motion.div
                            className="social-links flex gap-6 mt-4 mb-12"
                            variants={staggerContainer}
                        >
                            <motion.a
                                href="https://github.com/Reversenb"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "var(--accent-color)" }}
                                className="text-white transition-colors"
                            >
                                <Github size={28} />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/reverse7kk/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "var(--accent-color)" }}
                                className="text-white transition-colors"
                            >
                                <Instagram size={28} />
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* ✅ ส่วน 3D Keyboard */}
                    <motion.div
                        className="w-full relative mt-4 z-10"
                        variants={fadeInUp}
                        style={{ height: isMobile ? '400px' : '550px' }}
                    >
                        <KeyboardCanvas />
                    </motion.div>

                </motion.div>

                {/* ===== Right: Code Blocks ===== */}
                <motion.div
                    className="hero-right hidden md:flex"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1.5rem",
                    }}
                >
                    {/* Code Display 1 */}
                    <div className="code-display w-full max-w-[700px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1e1e1e]/80 backdrop-blur-xl">
                        <SyntaxHighlighter
                            language="typescript"
                            customStyle={{
                                margin: 0,
                                padding: "1.5rem",
                                background: "transparent",
                                fontSize: "0.9rem",
                            }}
                            style={vscDarkPlus}
                        >
                            {`const aboutMe: DeveloperProfile = {
  codename: "Thanabodee Sahakongsin", 
  role: "Full-Stack Developer",
  stack: {
    languages: ["JavaScript", "TypeScript", "Python", "C++", "C#", "Golang","Dart"],
    frameworks: ["React", "Next.js", "TailwindCSS", "Flutter", "Express", "Hono"],
  },
  traits: ["dark-mode purist", "bug-slayer"],
  missionStatement: "Craft. Learn. Ship.",
  availability: "Available for hire"
};`}
                        </SyntaxHighlighter>
                    </div>

                    {/* Code Display 2 (Typewriter) */}
                    <div className="code-display w-full max-w-[520px] relative">
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]/80 backdrop-blur-xl mb-4">
                            <SyntaxHighlighter
                                language="typescript"
                                customStyle={{
                                    margin: 0,
                                    padding: "1rem",
                                    background: "transparent",
                                    fontSize: "0.85rem",
                                }}
                                style={vscDarkPlus}
                            >
                                {typed + (blink ? " |" : "")}
                            </SyntaxHighlighter>
                        </div>

                        <motion.div
                            className="floating-card absolute -right-4 -bottom-4 z-20"
                            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="px-5 py-3 rounded-xl bg-slate-800/90 backdrop-blur-md shadow-lg border border-white/10 text-white flex items-center gap-2">
                                <span className="text-xl">🤖</span>
                                <span className="font-medium text-sm">Computer science</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 1, duration: 0.8 }
                }}
            >
                <motion.a
                    href="#projects"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                    className="flex flex-col items-center gap-1"
                >
                    <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                    <ChevronDown size={24} />
                </motion.a>
            </motion.div>

        </motion.section>
    )
}

export default Hero;