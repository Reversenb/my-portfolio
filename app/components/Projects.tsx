'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react";

// ✅ 1. Import รูปภาพเข้ามา (ตรวจสอบชื่อไฟล์ในโฟลเดอร์ app/assets ให้ตรงกัน)

import BallHub from "../assets/BallHub.jpg"; 
import BallHub2 from "../assets/BallHub2.jpg"; 
import Game from "../assets/game.jpg"; 
import Game2 from "../assets/game2.jpg"; 
import Tinner from "../assets/tinner.jpg"; 
import FireFocus from "../assets/Fire Focus.jpg"; 
import FireFocus1 from "../assets/Fire Focus.jpg"; 
import FireFocus2 from "../assets/Fire Focus.jpg"; 
import FireFocus3 from "../assets/Fire Focus.jpg"; 
import FireFocus4 from "../assets/Fire Focus.jpg"; 
import FireFocus6 from "../assets/Fire Focus.jpg"; 
import FireFocus7 from "../assets/Fire Focus.jpg"; 
import FireFocus8 from "../assets/Fire Focus.jpg"; 
import FireFocus9 from "../assets/Fire Focus.jpg"; 
import Ai1 from "../assets/ai1.jpg"; 
import Ai2 from "../assets/ai2.jpg"; 
import Pet1 from "../assets/pet1.jpg"; 
import Pet2 from "../assets/pet2.jpg"; 
import Fitjust from "../assets/Fitjust1.jpg"
import Fitjust2 from "../assets/Fitjust2.jpg"
import Phone from "../assets/phone.jpg"
import IhaveGPU1 from "../assets/gpu1.jpg"
import IhaveGPU2 from "../assets/gpu2.jpg"
import IhaveGPU3 from "../assets/gpu3.jpg"
import IhaveGPU4 from "../assets/gpu4.png"
// ถ้ามีรูปอื่นก็ import เพิ่ม: import rmuti2 from "../assets/rmuti2.jpg";

const projects = [
    {
        title: "BallHub",
        description: "Ballhub is a movie streaming web application inspired by platforms like Netflix. The platform is designed with a modern dark theme UI, smooth navigation, and a responsive movie browsing experience.",
        longDescription: "โปรเจกต์นี้เป็นการจำลองแพลตฟอร์มสตรีมมิ่งที่เน้นความเร็วและการตอบสนองของผู้ใช้งาน มีระบบจัดการข้อมูลภาพยนตร์ผ่าน MongoDB และเชื่อมต่อ API ที่พัฒนาด้วย ElysiaJS ทำให้การดึงข้อมูลทำได้รวดเร็วมาก",
        tech: ["Angular", "ElysiaJS", "MongoDB", "TypeScript", "REST API"],
        
        images: [BallHub, BallHub2], 
        link: "#",
        github: "#"
    },
    {
        title: "Hellfire Frenzy",
        description: "A fast-paced 2D action game where players step into the role of a fearless ninja frog armed with a trusty M16.",
        longDescription: "ตัวเกมเน้นความมันส์ในการต่อสู้กับมอนสเตอร์ พัฒนาด้วย Unity และเขียนสคริปต์ควบคุมด้วย C# มีระบบ Score และ Lives เพื่อเพิ่มความท้าทาย",
        tech: ["Unity", "C#"],
        images: [Game,Game2], 
        link: "#",
        github: "#"
    },
    {
        title: "Tinner App",
        description: "Tinner App is a 2D web/mobile application inspired by the Tinder dating experience.",
        longDescription: "แอปพลิเคชันหาคู่ที่เน้น UI/UX ที่ลื่นไหล มีระบบ Swipe Card และการ Match กันแบบ Real-time",
        tech: ["Angular", "ElysiaJS", "MongoDB", "TypeScript"],
        images: [Tinner],
        link: "#",
        github: "#"
    },
    {
       
    title: "Fire Focus",
    description: "A gamified focus timer application with offline party mode to boost productivity.",
    longDescription: "แอปพลิเคชันจับเวลาโฟกัสที่เปลี่ยนการทำงานให้เป็นเกมเลี้ยงกองไฟ (Gamification) โดดเด่นด้วยฟีเจอร์ Offline Party Mode เชื่อมต่อกับเพื่อนผ่าน Bluetooth โดยไม่ต้องใช้เน็ต เพื่อช่วยกันโฟกัสและสร้างวินัยร่วมกัน พร้อมระบบบทลงโทษ (Penalty) ตัดคะแนนจริง และ UI แบบ Glassmorphism สุดล้ำ",
    tech: ["Flutter", "Dart", "SQLite", "Nearby Connections", "Lottie", "Gemini API",],
    images: [FireFocus],
    link: "#",
    github: "#"

    },
    
{
    "title": "AI WEATHER",
    "description": "An intelligent weather assistant chatbot on LINE, powered by n8n and Gemini API.",
    "longDescription": "แชทบอทพยากรณ์อากาศอัจฉริยะบน LINE OA ที่ไม่ได้แค่บอกอุณหภูมิ แต่ดูแลคุณเหมือนเพื่อน พัฒนาด้วย n8n Workflow Automation ในการดึงข้อมูลสภาพอากาศ และใช้ Gemini API วิเคราะห์ข้อมูลเพื่อสร้างคำเตือนและข้อแนะนำที่เป็นธรรมชาติและใส่ใจผู้ใช้ (เช่น 'วันนี้พายุเข้านะ อย่าลืมพกร่มและขับรถระวังด้วย') รองรับการค้นหาตามรายชื่อจังหวัด",
    "tech": ["n8n", "Gemini API", "LINE Messaging API", "OpenWeatherMap", "Webhook"],
    "images": [Ai1,Ai2],
    "link": "#",
    "github": "#"
}
,
{
    
    "title": "Pet Feeder IoT",
    "description": "Smart automatic pet feeder controlled via mobile app using ESP8266 and Blynk.",
    "longDescription": "เครื่องให้อาหารสัตว์เลี้ยงอัตโนมัติ (Smart Pet Feeder) สั่งงานผ่านมือถือได้จากทุกที่ด้วยแอปพลิเคชัน Blynk เชื่อมต่อผ่าน WiFi โดยใช้ไมโครคอนโทรลเลอร์ ESP8266 ควบคุมการทำงานของ Servo Motor (MG995) แรงบิดสูงเพื่อเปิด-ปิดช่องจ่ายอาหารได้อย่างแม่นยำ มาพร้อมฟีเจอร์ตั้งเวลาให้อาหารอัตโนมัติ (Scheduled Timer) ช่วยให้สัตว์เลี้ยงไม่อดแม้เวลาที่คุณไม่อยู่บ้าน",
    "tech": ["ESP8266", "Blynk", "Arduino IDE", "C++", "Servo MG995"],
    "images": [Pet1,Pet2],
    "link": "#",
    "github": "#"

}
,
// {
    
   
   
//     "title": "Fit - 7 Day Workout Planner",
//     "description": "Personalized fitness scheduling app for 7-day workout routines and exercise tracking.",
//     "longDescription": "Fitjust เป็นแอปพลิเคชันจัดการตารางออกกำลังกายแบบครบวงจร 7 วัน ที่ช่วยให้ผู้ใช้งานสามารถวางแผนท่าออกกำลังกายในแต่ละวันได้อย่างเป็นระบบ มาพร้อมคลังท่าออกกำลังกายที่แบ่งตามส่วนต่างๆ ของร่างกาย (Body Parts) ผู้ใช้สามารถจัดตารางฝึกซ้อมล่วงหน้า ติดตามความคืบหน้า และตั้งเป้าหมายรายสัปดาห์ได้ เพื่อช่วยสร้างวินัยและทำให้การออกกำลังกายมีประสิทธิภาพสูงสุด",
//     "tech": ["Flutter", "Dart", "SQLite", "Lottie Animations","API"],
//     "images": [Fitjust,Fitjust2],
//     "link": "#",
//     "github": "#"



// },
{
  "title": "Phone Store Manager - ระบบบริหารจัดการร้านโทรศัพท์",
  "description": "Web Application สำหรับจัดการข้อมูลร้านค้าและเจ้าของร้านแบบ Real-time พัฒนาด้วย Next.js และ Supabase",
  "longDescription": "Phone Store Manager คือระบบ Back-office สำหรับบริหารจัดการเครือข่ายร้านขายโทรศัพท์มือถือ ออกแบบมาเพื่อให้ผู้ดูแลระบบ",
  "tech": [
    "Next.js ",
    "Supabase ",
    "Tailwind CSS",
    "TypeScript",
    "CRUD"
  ],
  "images": [
    Phone
  ],
  "link": "#",
  "github": "#"
},
{
  "title": "I HAVE GPU - AI PC Builder & Store",
  "description": "Next.js E-commerce platform with AI-powered PC specification builder.",
  "longDescription": "I HAVE GPU คือเว็บแอปพลิเคชัน E-commerce สำหรับจำหน่ายอุปกรณ์คอมพิวเตอร์ครบวงจร จุดเด่นคือระบบ 'AI PC Builder' ที่เชื่อมต่อกับ Gemini AI ช่วยให้ผู้ใช้สามารถจัดสเปกคอมพิวเตอร์ได้อัตโนมัติเพียงแค่พิมพ์ความต้องการ หรือระบุงบประมาณ ระบบจะเลือกอุปกรณ์ที่เข้ากันได้ (Compatibility Check) ให้ทันที มาพร้อมระบบจัดการสินค้า (Inventory), ระบบตะกร้า (Cart), การชำระเงิน และ Dashboard สำหรับ Admin เพื่อดูยอดขายและจัดการออเดอร์",
  "tech": ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Gemini AI API", "Zustand"],
  "images": [IhaveGPU1,IhaveGPU2,IhaveGPU3,IhaveGPU4], 
  "link": "#",
  "github": "#"
}

    
];

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const nextImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImgIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImgIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

    return (
        <section id="projects" className="py-24 px-[5%] relative bg-[#0b0f19]">
            <div className="max-w-[1200px] mx-auto">
                <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        My Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group relative cursor-pointer bg-[#1e1e1e]/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col"
                            onClick={() => {
                                setSelectedProject(project);
                                setCurrentImgIndex(0);
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ 
                                y: -12, 
                                scale: 1.02,
                                boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.15)",
                                borderColor: "rgba(99, 102, 241, 0.4)"
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative h-56 overflow-hidden">
                                <Image 
                                    src={project.images[0]} 
                                    alt={project.title} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                
                                <div className="absolute top-4 right-4 flex gap-2 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-indigo-600 transition-colors">
                                        <ExternalLink size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 relative z-10">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.slice(0, 3).map((t, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 group-hover:border-indigo-500/30 group-hover:text-indigo-300 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="text-[10px] px-2 py-1 text-gray-500">+{project.tech.length - 3}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div 
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        />
                        
                        <motion.div 
                            className="relative bg-[#161b22] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <button 
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
                                onClick={() => setSelectedProject(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="relative h-[300px] md:h-[450px] w-full bg-black">
                                <motion.div 
                                    key={currentImgIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="relative h-full w-full"
                                >
                                    <Image 
                                        src={selectedProject.images[currentImgIndex]} 
                                        alt="detail" 
                                        fill 
                                        className="object-contain"
                                    />
                                </motion.div>
                                
                                {selectedProject.images.length > 1 && (
                                    <>
                                        <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white">
                                            <ChevronLeft size={30} />
                                        </button>
                                        <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white">
                                            <ChevronRight size={30} />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedProject.images.map((_, i) => (
                                                <div key={i} className={`w-2 h-2 rounded-full ${i === currentImgIndex ? "bg-white" : "bg-white/30"}`} />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-8">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech.map((t) => (
                                                <span key={t} className="text-xs px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <a href={selectedProject.github} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                                            <Github size={18} /> Code
                                        </a>
                                        <a href={selectedProject.link} className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all">
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed italic border-l-4 border-indigo-500 pl-4 mb-6">
                                    {selectedProject.description}
                                </p>
                                <div className="text-gray-400 text-sm md:text-base space-y-4">
                                    <p>{selectedProject.longDescription}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}