import React from "react";

interface WaveLoaderProps {
  // Size customization
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "custom";
  customWidth?: number; // Custom width in pixels
  customHeight?: number; // Custom height in pixels

  // Animation customization
  speed?: "very-slow" | "slow" | "normal" | "fast" | "very-fast" | number; // number in seconds
  bars?: number; // Number of bars (1-12)

  // Color customization
  color?: "blue" | "primary" | "secondary" | "gradient" | "rainbow" | "custom";
  customColors?: string[]; // Array of custom colors

  // Spacing and layout
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  // Shape and style
  shape?: "rectangle" | "rounded" | "pill" | "circle";
  shadow?: boolean;
  glow?: boolean;

  // Container customization
  className?: string;
  containerClassName?: string;

  // Text props
  showText?: boolean;
  text?: string;
  textPosition?: "top" | "bottom" | "left" | "right";
  textClassName?: string;

  // Animation behavior
  staggerDelay?: number; // Delay between bars in seconds
  animationType?: "scale" | "bounce" | "fade" | "slide";

  // Full screen overlay
  overlay?: boolean;
  overlayClassName?: string;
}

const Loader: React.FC<WaveLoaderProps> = ({
  size = "md",
  customWidth,
  customHeight,
  speed = "normal",
  bars = 5,
  color = "blue",
  customColors = [],
  gap = "sm",
  shape = "rounded",
  shadow = false,
  glow = false,
  className = "",
  containerClassName = "",
  showText = false,
  text = "Loading...",
  textPosition = "bottom",
  textClassName = "",
  staggerDelay = 0.1,
  animationType = "scale",
  overlay = false,
  overlayClassName = "",
}) => {
  // Size configurations
  const sizeConfigs = {
    xs: { width: 2, height: 12, textSize: "text-xs" },
    sm: { width: 3, height: 16, textSize: "text-sm" },
    md: { width: 4, height: 24, textSize: "text-base" },
    lg: { width: 6, height: 32, textSize: "text-lg" },
    xl: { width: 8, height: 48, textSize: "text-xl" },
    "2xl": { width: 12, height: 64, textSize: "text-2xl" },
    "3xl": { width: 16, height: 80, textSize: "text-3xl" },
    custom: {
      width: customWidth || 8,
      height: customHeight || 48,
      textSize: "text-lg",
    },
  };

  // Speed configurations
  const getAnimationDuration = () => {
    if (typeof speed === "number") return speed;
    const speedMap = {
      "very-slow": 3,
      slow: 2,
      normal: 1.2,
      fast: 0.8,
      "very-fast": 0.5,
    };
    return speedMap[speed];
  };

  // Color configurations
  const colorConfigs = {
    blue: ["#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
    primary: ["#1e40af", "#2563eb", "#3b82f6", "#60a5fa"],
    secondary: ["#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0"],
    gradient: ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"], // Purple gradient
    rainbow: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"],
    custom: customColors.length > 0 ? customColors : ["#3b82f6"],
  };

  // Gap configurations
  const gapClasses = {
    none: "space-x-0",
    xs: "space-x-0.5",
    sm: "space-x-1",
    md: "space-x-2",
    lg: "space-x-3",
    xl: "space-x-4",
  };

  // Shape configurations
  const getShapeClass = (width: number) => {
    switch (shape) {
      case "rectangle":
        return "rounded-none";
      case "rounded":
        return "rounded-sm";
      case "pill":
        return "rounded-full";
      case "circle":
        return `rounded-full w-${width} h-${width}`;
      default:
        return "rounded-sm";
    }
  };

  // Animation keyframes
  const getAnimationKeyframes = () => {
    switch (animationType) {
      case "scale":
        return {
          "0%, 40%, 100%": { transform: "scaleY(0.4)", opacity: "0.8" },
          "20%": { transform: "scaleY(1)", opacity: "1" },
        };
      case "bounce":
        return {
          "0%, 100%": { transform: "translateY(0) scaleY(0.6)" },
          "50%": { transform: "translateY(-20px) scaleY(1)" },
        };
      case "fade":
        return {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        };
      case "slide":
        return {
          "0%, 100%": { transform: "translateX(-20px) scaleY(0.6)" },
          "50%": { transform: "translateX(0) scaleY(1)" },
        };
      default:
        return {
          "0%, 40%, 100%": { transform: "scaleY(0.4)" },
          "20%": { transform: "scaleY(1)" },
        };
    }
  };

  const config = sizeConfigs[size];
  const colors = colorConfigs[color];
  const duration = getAnimationDuration();
  const keyframes = getAnimationKeyframes();

  // Generate bars
  const waveElements = [...Array(Math.min(bars, 12))].map((_, index) => {
    const barColor = colors[index % colors.length];
    const animationDelay = index * staggerDelay;

    const barStyle = {
      width: `${config.width}px`,
      height: `${config.height}px`,
      backgroundColor: barColor,
      animation: `waveAnimation ${duration}s infinite ease-in-out`,
      animationDelay: `${animationDelay}s`,
      boxShadow: shadow ? `0 4px 8px rgba(59, 130, 246, 0.3)` : "none",
      filter: glow ? `drop-shadow(0 0 8px ${barColor})` : "none",
    };

    return (
      <div
        key={index}
        className={`${getShapeClass(config.width)} ${className}`}
        style={barStyle}
      />
    );
  });

  // Text element
  const textElement = showText && (
    <div
      className={`${config.textSize} font-medium text-blue-600 animate-pulse ${textClassName}`}
    >
      {text}
    </div>
  );

  // Layout based on text position
  const getLayoutClasses = () => {
    switch (textPosition) {
      case "top":
        return "flex-col";
      case "bottom":
        return "flex-col";
      case "left":
        return "flex-row items-center";
      case "right":
        return "flex-row-reverse items-center";
      default:
        return "flex-col";
    }
  };

  const content = (
    <div
      className={`flex items-center justify-center ${getLayoutClasses()} ${containerClassName}`}
    >
      <style>{`
        @keyframes waveAnimation {
          ${Object.entries(keyframes)
            .map(
              ([key, value]) => `
            ${key} {
              ${Object.entries(value as any)
                .map(([prop, val]) => `${prop}: ${val};`)
                .join(" ")}
            }
          `
            )
            .join(" ")}
        }
      `}</style>

      {textPosition === "top" && textElement}
      {textPosition === "left" && textElement}

      <div
        className={`flex items-end ${gapClasses[gap]} ${
          textPosition === "left" || textPosition === "right" ? "ml-4" : ""
        }`}
      >
        {waveElements}
      </div>

      {textPosition === "right" && textElement}
      {textPosition === "bottom" && textElement}
    </div>
  );

  // Return with or without overlay
  if (overlay) {
    return (
      <div
        className={`fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 ${overlayClassName}`}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
