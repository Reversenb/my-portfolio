'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
    {
        title: "BallHub",
        description: "A movie streaming web application inspired by Netflix. Designed with a modern dark theme UI, smooth navigation, and responsive experience.",
        tech: ["Angular", "ElysiaJS", "MongoDB", "TypeScript"],
        image: "/project/1.jpg",
        link: "#", 
        github: "#"
    },
    {
        title: "Hellfire Frenzy",
        description: "A fast-paced 2D action game. Roleplay as a ninja frog armed with an M16, hunting down monsters across chaotic battlefields.",
        tech: ["Unity", "C#", "Game Design"],
        image: "/project/2.jpg",
        link: "#",
        github: "#"
    },
    {
        title: "Tinner App",
        description: "A web/mobile app inspired by Tinder. Features card-swiping interface for matching users and real-time chat functionality.",
        tech: ["Angular", "MongoDB", "TypeScript", "Socket.io"],
        image: "/project/3.jpg",
        link: "#",
        github: "#"
    },
     {
        title: "Tinner App",
        description: "A web/mobile app inspired by Tinder. Features card-swiping interface for matching users and real-time chat functionality.",
        tech: ["Angular", "MongoDB", "TypeScript", "Socket.io"],
        image: "/project/3.jpg",
        link: "#",
        github: "#"
    },
     {
        title: "Tinner App",
        description: "A web/mobile app inspired by Tinder. Features card-swiping interface for matching users and real-time chat functionality.",
        tech: ["Angular", "MongoDB", "TypeScript", "Socket.io"],
        image: "/project/3.jpg",
        link: "#",
        github: "#"
    },
     {
        title: "Tinner App",
        description: "A web/mobile app inspired by Tinder. Features card-swiping interface for matching users and real-time chat functionality.",
        tech: ["Angular", "MongoDB", "TypeScript", "Socket.io"],
        image: "/project/3.jpg",
        link: "#",
        github: "#"
    },
     {
        title: "Tinner App",
        description: "A web/mobile app inspired by Tinder. Features card-swiping interface for matching users and real-time chat functionality.",
        tech: ["Angular", "MongoDB", "TypeScript", "Socket.io"],
        image: "/project/3.jpg",
        link: "#",
        github: "#"
    },
     {
        title: "Tinner App",
        description: "A web/mobile app inspired by Tinder. Features card-swiping interface for matching users and real-time chat functionality.",
        tech: ["Angular", "MongoDB", "TypeScript", "Socket.io"],
        image: "/project/3.jpg",
        link: "#",
        github: "#"
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-24 px-[5%] relative">
            <div className="max-w-[1200px] mx-auto">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        My Project
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A collection of projects that I've worked on, ranging from web applications,applications to game development.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-[#1e1e1e]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <a href={project.github} className="p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm text-white transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.link} className="p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm text-white transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-indigo-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}