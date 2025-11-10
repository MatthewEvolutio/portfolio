import React from "react";


type CardVariant = "default" | "sub";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}


const base = "glass-strong transition-all duration-500 relative";
const defaultCard = "rounded-3xl border p-4 md:p-6 lg:p-8 shadow-lg ring-2 ring-(--accent) hover:shadow-xl hover:ring-(--accent-strong) hover:bg-transparent hover:scale-[1.02] bg-(--accent)/5 before:absolute before:-inset-1 before:rounded-[28px] before:border before:border-(--accent)/20 before:-z-10";
const subCard = "rounded-2xl border p-4 shadow-md ring-1 ring-(--accent) bg-background/40 dark:bg-white/5 hover:scale-[1.02] hover:ring-2 hover:ring-(--accent-strong) hover:shadow-lg";

const Card = ({ children, className = "", variant = "default", ...props }: CardProps) => (
  <div
    className={[
      base,
      variant === "sub" ? subCard : defaultCard,
      className
    ].join(" ").trim()}
    style={{ margin: '4px' }} // Prevents border cutoff on scale
    {...props}
  >
    {children}
  </div>
);

export default Card;
