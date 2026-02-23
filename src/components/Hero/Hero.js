import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Hero.css";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const rotatingWords = [
    "Innovation",
    "Healthcare",
    "Excellence",
    "Life",
    "Future",
  ];

  /* ---- Canvas-based animated molecular/DNA background ---- */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // --- Particle system ---
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 2.5 + 0.8;
        this.dx = (Math.random() - 0.5) * 0.6;
        this.dy = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        const colors = [
          [86, 224, 196], // mint/accent
          [78, 205, 196], // teal
          [0, 124, 110], // deep teal
          [120, 230, 200], // light mint
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > w) this.dx *= -1;
        if (this.y < 0 || this.y > h) this.dy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`;
        ctx.fill();
        // glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity * 0.15})`;
        ctx.fill();
      }
    }

    const particleCount = Math.min(120, Math.floor((w * h) / 12000));
    const particles = Array.from(
      { length: particleCount },
      () => new Particle(),
    );

    // --- Connection lines ---
    const drawConnections = () => {
      const maxDist = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(78,205,196,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    // --- DNA Helix ---
    const drawDNA = (time) => {
      const helixX = w * 0.82;
      const amplitude = 60;
      const segments = 50;
      const speed = 0.002;
      const vertSpacing = h / segments;

      for (let i = 0; i < segments; i++) {
        const y = i * vertSpacing;
        const phase = time * speed + i * 0.25;
        const x1 = helixX + Math.sin(phase) * amplitude;
        const x2 = helixX + Math.sin(phase + Math.PI) * amplitude;
        const alpha = 0.15 + 0.1 * Math.sin(phase);

        // strand 1 dot
        ctx.beginPath();
        ctx.arc(x1, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(86,224,196,${alpha})`;
        ctx.fill();

        // strand 2 dot
        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(78,205,196,${alpha})`;
        ctx.fill();

        // connecting bar
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    // --- Floating hexagons (molecular) ---
    const hexagons = Array.from({ length: 6 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 30 + 15,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.08 + 0.04,
    }));

    const drawHex = (hx, hy, size, rot, opacity) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rot + (Math.PI / 3) * i;
        const px = hx + size * Math.cos(angle);
        const py = hy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(78,205,196,${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    // --- Pulsing rings (center) ---
    const drawPulse = (time) => {
      const cx = w * 0.5;
      const cy = h * 0.38;
      for (let i = 0; i < 3; i++) {
        const t = ((time * 0.001 + i * 1.2) % 4) / 4;
        const r = t * 180;
        const alpha = (1 - t) * 0.08;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,124,110,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    // --- Main loop ---
    let startTime = performance.now();
    const animate = (timestamp) => {
      const time = timestamp - startTime;
      ctx.clearRect(0, 0, w, h);

      // dark teal base
      ctx.fillStyle = "#0e2926";
      ctx.fillRect(0, 0, w, h);

      // subtle radial glow center
      const grd = ctx.createRadialGradient(
        w * 0.4,
        h * 0.4,
        0,
        w * 0.4,
        h * 0.4,
        w * 0.6,
      );
      grd.addColorStop(0, "rgba(0,124,110,0.18)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // secondary glow
      const grd2 = ctx.createRadialGradient(
        w * 0.75,
        h * 0.25,
        0,
        w * 0.75,
        h * 0.25,
        w * 0.35,
      );
      grd2.addColorStop(0, "rgba(78,205,196,0.08)");
      grd2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, w, h);

      drawPulse(time);
      drawDNA(time);
      drawConnections();

      hexagons.forEach((hex) => {
        hex.x += hex.dx;
        hex.y += hex.dy;
        hex.rotation += hex.rotSpeed;
        if (hex.x < -50 || hex.x > w + 50) hex.dx *= -1;
        if (hex.y < -50 || hex.y > h + 50) hex.dy *= -1;
        drawHex(hex.x, hex.y, hex.size, hex.rotation, hex.opacity);
      });

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [rotatingWords.length]);

  return (
    <section className="hero" id="home">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Content */}
      <div
        className={`hero__content ${isVisible ? "hero__content--visible" : ""}`}
      >
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          Global Leader in Pharmaceutical Innovation
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--1">
            <span className="hero__title-text">Asle</span>
          </span>
          <span className="hero__title-line hero__title-line--2">
            <span className="hero__title-text hero__title-text--outline">
              Pharmaceuticals
            </span>
          </span>
        </h1>

        <div className="hero__rotating">
          <span className="hero__rotating-label">Redefining</span>
          <div className="hero__rotating-word-wrapper">
            {rotatingWords.map((word, index) => (
              <span
                key={word}
                className={`hero__rotating-word ${index === currentWord ? "hero__rotating-word--active" : ""}`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <p className="hero__subtitle">
          Pioneering breakthrough therapies and innovative healthcare solutions
          across <strong>80+ countries</strong>, transforming patient lives
          through science, research, and compassion.
        </p>

        <div className="hero__actions">
          <a href="#products" className="hero__btn hero__btn--primary">
            <span>Explore Products</span>
            <i className="fas fa-arrow-right"></i>
          </a>
          <a href="#about" className="hero__btn hero__btn--secondary">
            <i className="fas fa-play-circle"></i>
            <span>Our Story</span>
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">80+</span>
            <span className="hero__stat-label">Countries</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">500+</span>
            <span className="hero__stat-label">Products</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">50M+</span>
            <span className="hero__stat-label">Patients Served</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-number">30+</span>
            <span className="hero__stat-label">Years Legacy</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;
