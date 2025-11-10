"use client";
import { useEffect, useRef } from "react";

export default function ParticlesBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const PARTICLE_COUNT = 180;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const speed = 0.3 + Math.random() * 0.25; // base momentum
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.8,
        vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.8,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
        r: 2.2 + Math.random() * 2.8,
        o: 0.55 + Math.random() * 0.45,
      };
    });

    // Mouse interaction
    let mouse = { x: width / 2, y: height / 2, active: false };
    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function handleMouseLeave() {
      mouse.active = false;
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.o;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        // Stronger contrast: white core, accent border, strong shadow
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "var(--accent)";
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "var(--accent-strong)";
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    }

    function update() {
      for (const p of particles) {
        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            // Push away from cursor
            const force = (100 - dist) / 100 * 2.2;
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
          }
        }
        // Add base momentum (constant drift)
        p.vx += 0.01 * p.baseVx;
        p.vy += 0.01 * p.baseVy;
        p.x += p.vx;
        p.y += p.vy;
        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
    }

    function animate() {
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={"fixed inset-0 w-full h-full pointer-events-none z-0 " + className}
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
}
