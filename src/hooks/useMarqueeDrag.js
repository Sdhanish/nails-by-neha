import { useRef, useEffect, useCallback } from 'react';

/**
 * useMarqueeDrag
 * Provides ultra-smooth infinite marquee auto-scrolling with manual mouse drag & touch swipe.
 * Guarantees zero resumption jump when dragging starts or finishes.
 * 
 * @param {Object} options
 * @param {'rtl' | 'ltr'} [options.direction='rtl'] - 'rtl' moves cards to the left, 'ltr' moves cards to the right
 * @param {number} [options.speed=45] - Speed in pixels per second
 */
export function useMarqueeDrag({ direction = 'rtl', speed = 45 } = {}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const halfWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const trackStartXRef = useRef(0);
  const isIntentionalDragRef = useRef(false);
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(null);
  const initializedRef = useRef(false);

  // Measure half-width (width of one duplicate set)
  const updateWidth = useCallback(() => {
    if (!trackRef.current) return;
    const firstChild = trackRef.current.firstElementChild;
    if (firstChild && firstChild.offsetWidth > 0) {
      halfWidthRef.current = firstChild.offsetWidth;
    } else if (trackRef.current.scrollWidth > 0) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }

    // Set initial position for LTR once width is known
    if (direction === 'ltr' && !initializedRef.current && halfWidthRef.current > 0) {
      xRef.current = -halfWidthRef.current;
      trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      initializedRef.current = true;
    }
  }, [direction]);

  useEffect(() => {
    updateWidth();

    // Use ResizeObserver to detect when images finish loading and layout stabilizes
    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      ro = new ResizeObserver(() => {
        updateWidth();
      });
      ro.observe(trackRef.current);
      if (trackRef.current.firstElementChild) {
        ro.observe(trackRef.current.firstElementChild);
      }
    }

    const handleResize = () => updateWidth();
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // RAF Loop
    const animate = (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05); // clamp dt to avoid jumps
      lastTimeRef.current = time;

      const W = halfWidthRef.current;

      if (!isDraggingRef.current && !prefersReducedMotion && W > 0) {
        const moveStep = speed * dt;
        if (direction === 'ltr') {
          xRef.current += moveStep;
          while (xRef.current >= 0) {
            xRef.current -= W;
          }
          while (xRef.current < -W) {
            xRef.current += W;
          }
        } else {
          // RTL
          xRef.current -= moveStep;
          while (xRef.current <= -W) {
            xRef.current += W;
          }
          while (xRef.current > 0) {
            xRef.current -= W;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, speed, updateWidth]);

  // Pointer event handlers
  const handlePointerDown = (e) => {
    // Only primary mouse button or touch
    if (e.button !== undefined && e.button !== 0) return;

    updateWidth();
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    isIntentionalDragRef.current = false;
    pointerStartXRef.current = e.clientX;
    pointerStartYRef.current = e.clientY;
    trackStartXRef.current = xRef.current;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - pointerStartXRef.current;
    const deltaY = e.clientY - pointerStartYRef.current;

    if (!isIntentionalDragRef.current) {
      // Vertical scroll check on touch devices
      if (e.pointerType === 'touch') {
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
          isDraggingRef.current = false;
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {
            // ignore
          }
          return;
        }
      }

      if (Math.abs(deltaX) > 5) {
        hasMovedRef.current = true;
        isIntentionalDragRef.current = true;
      }
    }

    if (isIntentionalDragRef.current || e.pointerType === 'mouse') {
      if (Math.abs(deltaX) > 5) {
        hasMovedRef.current = true;
      }
      const W = halfWidthRef.current;
      let newX = trackStartXRef.current + deltaX;

      if (W > 0) {
        while (newX <= -W) newX += W;
        while (newX > 0) newX -= W;
      }

      xRef.current = newX;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
      }
    }
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    isIntentionalDragRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Keep hasMovedRef true briefly to swallow accidental click events
    if (hasMovedRef.current) {
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 60);
    }
  };

  const handleClickCapture = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return {
    containerRef,
    trackRef,
    hasMovedRef,
    containerProps: {
      ref: containerRef,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      onClickCapture: handleClickCapture,
      style: { touchAction: 'pan-y' },
    },
  };
}
