import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';


interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  id,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic pull
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth fluid movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;

    const { clientX, clientY } = e;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate center point of the button
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    // Calculate distance of cursor from center, scaled down
    const pullX = (clientX - centerX) * 0.35; // 35% magnetic pull strength
    const pullY = (clientY - centerY) * 0.35;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Build styles
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-semibold rounded-full  transition-colors duration-300 select-none cursor-pointer overflow-hidden outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#4C7A2A] text-[#FBF8F1] hover:text-[#4C7A2A] focus:ring-[#4C7A2A]",
    secondary: "bg-[#D9352A] text-[#FBF8F1] hover:text-[#D9352A] focus:ring-[#D9352A]",
    outline: "border-2 border-[#4C7A2A] text-[#4C7A2A] hover:text-[#FBF8F1] focus:ring-[#4C7A2A]",
    text: "text-[#4C7A2A] hover:bg-black/5 focus:ring-[#4C7A2A]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4.5 text-base",
  };

  return (
    <motion.button
      ref={buttonRef}
      id={`btn-${id || Math.random().toString(36).substr(2, 9)}`}
      style={{
        x: magnetic ? springX : 0,
        y: magnetic ? springY : 0,
      }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {/* Background slide/sweep visual effect for hover */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-[#FBF8F1] origin-bottom rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          style={{ zIndex: 0 }}
        />
      )}

      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 bg-[#FBF8F1] origin-bottom rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          style={{ zIndex: 0 }}
        />
      )}

      {variant === 'outline' && (
        <motion.div
          className="absolute inset-0 bg-[#4C7A2A] origin-bottom rounded-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          style={{ zIndex: 0 }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
