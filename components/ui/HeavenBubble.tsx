"use client";
import { Zap } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const HeavenBubble = ({ onTriggerPaperHands }: { onTriggerPaperHands: () => void }) => {
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // FIX 1: Initialize position with generic values (e.g., 0, 0)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // FIX 2: Calculate initial Y position ONLY in the browser
  useEffect(() => {
    // This code only runs after the component is mounted on the client
    if (typeof window !== 'undefined' && position.y === 0) {
      setPosition({ x: 20, y: window.innerHeight / 2 - 50 });
    }
  }, [position.y]);

  // Use passive layout effect for drag operations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !bubbleRef.current) return;

      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      
      // Calculate boundaries
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const bubbleSize = 100; // Approx size of the button (w-24 h-24)
      
      // Lock position within screen boundaries
      const finalX = Math.min(Math.max(newX, 0), screenWidth - bubbleSize);
      const finalY = Math.min(Math.max(newY, 0), screenHeight - bubbleSize);

      setPosition({ x: finalX, y: finalY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!bubbleRef.current) return;
    
    // Check if the target is the button itself (not just the icon)
    const rect = bubbleRef.current.getBoundingClientRect();
    setOffset({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      onTriggerPaperHands();
    }
    // Prevent the drag end from triggering a click
    e.stopPropagation(); 
  };

  return (
    <motion.button 
      ref={bubbleRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      // Set initial and dynamic positions using CSS transform
      style={{ 
        left: 0, 
        top: 0, 
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      // z-39 ensures it is hidden behind the z-40 Navbar and z-50 Mobile Menu
      className={cn(
        "fixed w-24 h-24 p-2 rounded-full font-terminal shadow-lg z-39 select-none",
        "bg-white/95 text-pink-600 border border-pink-300",
        "shadow-[0_0_15px_rgba(255,192,203,0.8)] hover:scale-110 transition-transform duration-100",
        "flex flex-col items-center justify-center text-xs md:text-sm font-bold",
        isDragging ? 'transition-none' : 'transition-transform' // Disable transition when dragging
      )}
    >
      <Zap size={24} className="text-pink-600 fill-pink-600 mb-1 animate-pulse" />
      HEAVEN
    </motion.button>
  );
};
