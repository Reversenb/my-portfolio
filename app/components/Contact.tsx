'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2 } from "lucide-react";

export function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formData,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-24 px-[5%] relative bg-[#0b0f19]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[600px] mx-auto relative z-10">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
                    <p className="text-gray-400">Have a project in mind or just want to say hi?</p>
                </motion.div>

                <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                            placeholder="Thanabodee SK"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                            placeholder="Thanabodee@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Message</label>
                        <textarea
                            required
                            rows={5}
                            className="w-full bg-[#1e1e1e]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600 resize-none"
                            placeholder="Tell me about your project..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {status === "sending" ? (
                            <><Loader2 className="animate-spin" size={20} /> Sending...</>
                        ) : status === "success" ? (
                            <span className="text-green-600">Message Sent!</span>
                        ) : status === "error" ? (
                            <span className="text-red-500">Failed. Try Again.</span>
                        ) : (
                            <>Send Message <Send size={20} /></>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}