import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  // Mouse state & tracking
  const mousePos = useRef({ x: -100, y: -100, speed: 0 });
  const idleTimer = useRef(null);
  const lastSpawnPos = useRef({ x: -100, y: -100 });
  const lastSpawnTime = useRef(0);

  // Hover flags kept in a ref to avoid React re-renders on movement
  const hoverState = useRef({
    isInteractive: false,
    isCard: false,
    isInput: false,
    isVisible: false,
  });

  useEffect(() => {
    // Only run on devices with a true mouse/trackpad pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI canvas sizing
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize, { passive: true });

    // Expanding water ripples: { x, y, radius, maxRadius, alpha, decay, growth, colorType }
    const ripples = [];

    let isLoopRunning = false;
    let lastTarget = null;

    const requestRender = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      hoverState.current.isVisible = true;

      // Instantaneous mouse speed
      const dx = x - mousePos.current.x;
      const dy = y - mousePos.current.y;
      const dist = Math.hypot(dx, dy);
      mousePos.current.speed = dist;
      mousePos.current.x = x;
      mousePos.current.y = y;

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        mousePos.current.speed = 0;
      }, 70);

      const target = e.target;
      if (target && target.closest && target !== lastTarget) {
        lastTarget = target;
        // Text inputs / editable elements
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          Boolean(target.closest('input, textarea, [contenteditable="true"]'));
        hoverState.current.isInput = isInput;

        // Buttons / links
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.getAttribute('role') === 'button' ||
          Boolean(target.closest('button, a, [role="button"]'));
        hoverState.current.isInteractive = isInteractive;

        // Cards / images
        const isCard =
          Boolean(target.closest('.group')) ||
          target.tagName === 'IMG' ||
          Boolean(target.closest('article, .swiper-slide'));
        hoverState.current.isCard = isCard && !isInteractive;
      }

      // No ripples over text inputs
      if (hoverState.current.isInput) {
        return;
      }

      const now = performance.now();
      const distFromLastSpawn = Math.hypot(
        x - lastSpawnPos.current.x,
        y - lastSpawnPos.current.y
      );

      // Spawn expanding water ripple as cursor travels across water surface
      if (distFromLastSpawn > 14 || (dist > 6 && now - lastSpawnTime.current > 35)) {
        lastSpawnPos.current = { x, y };
        lastSpawnTime.current = now;

        const baseRadius = hoverState.current.isCard ? 14 : 10;
        const maxRadius = hoverState.current.isCard
          ? 48 + Math.min(dist * 0.6, 20)
          : hoverState.current.isInteractive
            ? 28
            : 36 + Math.min(dist * 0.5, 18);

        const initialAlpha = hoverState.current.isCard
          ? 0.32
          : hoverState.current.isInteractive
            ? 0.36
            : 0.22;

        ripples.push({
          x,
          y,
          radius: baseRadius,
          maxRadius,
          alpha: initialAlpha,
          decay: 0.94,
          growth: 0.085,
          colorType: hoverState.current.isInteractive
            ? 'accent'
            : hoverState.current.isCard
              ? 'rose'
              : 'blush',
        });

        // Cap active ripples for performance
        if (ripples.length > 22) ripples.shift();
        requestRender();
      }
    };

    const handleMouseDown = (e) => {
      if (hoverState.current.isInput) return;
      const x = e ? e.clientX : mousePos.current.x;
      const y = e ? e.clientY : mousePos.current.y;
      // Click impulse wave (soft expanding water droplet)
      ripples.push({
        x,
        y,
        radius: 8,
        maxRadius: 44,
        alpha: 0.4,
        decay: 0.93,
        growth: 0.12,
        colorType: 'accent',
      });
      requestRender();
    };

    const handleMouseLeave = () => {
      hoverState.current.isVisible = false;
    };

    const handleMouseEnter = () => {
      hoverState.current.isVisible = true;
      requestRender();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    // Render loop: draws expanding water ripples and sleeps when all have faded
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (hoverState.current.isVisible && !hoverState.current.isInput && ripples.length > 0) {
        // Expanding water ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];

          r.radius += (r.maxRadius - r.radius) * r.growth;
          r.alpha *= r.decay;

          if (r.alpha < 0.015) {
            ripples.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);

          const grad = ctx.createRadialGradient(
            r.x,
            r.y,
            Math.max(r.radius * 0.45, 0),
            r.x,
            r.y,
            r.radius
          );

          if (r.colorType === 'accent') {
            grad.addColorStop(0, 'rgba(232, 93, 117, 0)');
            grad.addColorStop(0.55, `rgba(250, 218, 221, ${r.alpha * 0.5})`);
            grad.addColorStop(0.85, `rgba(232, 93, 117, ${r.alpha * 0.65})`);
            grad.addColorStop(1, 'rgba(232, 93, 117, 0)');
          } else if (r.colorType === 'rose') {
            grad.addColorStop(0, 'rgba(248, 238, 240, 0)');
            grad.addColorStop(0.6, `rgba(250, 218, 221, ${r.alpha * 0.45})`);
            grad.addColorStop(0.88, `rgba(232, 93, 117, ${r.alpha * 0.35})`);
            grad.addColorStop(1, 'rgba(248, 238, 240, 0)');
          } else {
            grad.addColorStop(0, 'rgba(250, 218, 221, 0)');
            grad.addColorStop(0.5, `rgba(248, 238, 240, ${r.alpha * 0.35})`);
            grad.addColorStop(0.85, `rgba(232, 93, 117, ${r.alpha * 0.28})`);
            grad.addColorStop(1, 'rgba(250, 218, 221, 0)');
          }

          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }

        // When all ripples fade out, sleep loop immediately
        if (ripples.length === 0) {
          isLoopRunning = false;
          return;
        }

        animFrameId.current = requestAnimationFrame(render);
      } else {
        isLoopRunning = false;
      }
    };

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(idleTimer.current);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="liquid-mouse-canvas pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
