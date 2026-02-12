'use client';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-[#0b0f19] text-center">
            <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Thanabodee Sahakongsin. All rights reserved.
            </p>
        </footer>
    );
}