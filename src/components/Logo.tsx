import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export default function Logo({ className = '', animate = true, size = 'md' }: LogoProps) {
  // Sizes mapping
  const sizes = {
    sm: { svg: 'h-8 w-auto', text: 'text-sm font-bold tracking-tight' },
    md: { svg: 'h-10 w-auto', text: 'text-lg font-bold tracking-tight' },
    lg: { svg: 'h-14 w-auto', text: 'text-2xl font-bold tracking-tight' },
    hero: { svg: 'h-24 w-auto', text: 'text-5xl font-extrabold tracking-tight' },
  };

  const currentSize = sizes[size] || sizes.md;

  // SVG Path for Jalapeño Leaf / Mexico silhouette combo
  const leafPath = "M40 85 C32 80, 20 68, 15 50 C10 32, 22 20, 38 10 C52 5, 68 12, 75 25 C82 38, 78 55, 70 65 C62 75, 48 85, 40 85 Z M40 85 C45 70, 50 55, 55 40 M30 35 C38 38, 48 40, 52 42";

  const leafVariants = {
    hidden: { pathLength: 0, opacity: 0, stroke: "#E8A33D" },
    visible: {
      pathLength: 1,
      opacity: 1,
      stroke: "#4C7A2A",
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" },
        stroke: { delay: 0.8, duration: 0.4 },
        opacity: { duration: 0.2 }
      }
    }
  };

  const leafFillVariants = {
    hidden: { fill: "rgba(76, 122, 42, 0)" },
    visible: {
      fill: "rgba(76, 122, 42, 0.12)",
      transition: { delay: 0.8, duration: 0.5 }
    }
  };

  const textGreenVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.9, duration: 0.6, ease: "easeOut" }
    }
  };

  const textRedVariants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.9, duration: 0.6, ease: "easeOut" }
    }
  };

  if (!animate) {
    return (
      <div id="jalapeno-logo" className={`flex items-center gap-2 select-none ${className}`}>
        {/* Leaf Graphic */}
        <svg viewBox="0 0 100 100" className={`${currentSize.svg} flex-shrink-0 fill-current text-[#4C7A2A]`}>
          <path
            d={leafPath}
            fill="rgba(76, 122, 42, 0.12)"
            stroke="#4C7A2A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Flame/stem accent */}
          <path
            d="M52 42 C56 43, 62 48, 65 55"
            stroke="#D9352A"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Wordmark */}
        <span className={`font-sans tracking-tight ${currentSize.text} flex items-center`}>
          <span className="text-[#4C7A2A] font-black mr-1">JALAPEÑO</span>
          <span className="text-[#D9352A] font-black">TACO</span>
        </span>
      </div>
    );
  }

  return (
    <div id="jalapeno-logo-animated" className={`flex items-center gap-2 select-none ${className}`}>
      {/* Animated Leaf Graphic */}
      <svg viewBox="0 0 100 100" className={`${currentSize.svg} flex-shrink-0`}>
        <motion.path
          d={leafPath}
          variants={leafFillVariants}
          initial="hidden"
          animate="visible"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d={leafPath}
          variants={leafVariants}
          initial="hidden"
          animate="visible"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Small Flame/stem red accent */}
        <motion.path
          d="M52 42 C56 43, 62 48, 65 55"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          stroke="#D9352A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Animated Wordmark */}
      <div className={`overflow-hidden py-1 flex items-center ${currentSize.text}`}>
        <motion.span
          variants={textGreenVariants}
          initial="hidden"
          animate="visible"
          className="text-[#4C7A2A] font-black mr-1.5 block"
        >
          JALAPEÑO
        </motion.span>
        <motion.span
          variants={textRedVariants}
          initial="hidden"
          animate="visible"
          className="text-[#D9352A] font-black block"
        >
          TACO
        </motion.span>
      </div>
    </div>
  );
}
