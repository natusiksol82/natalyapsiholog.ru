"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from "react";
import type { Locale } from "./content";
import { educationDocuments, educationLabels } from "./education-documents";

const count = educationDocuments.length;
const slides = [educationDocuments[count - 1], ...educationDocuments, educationDocuments[0]];
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getPageVisible = () => document.visibilityState === "visible";
const serverFalse = () => false;
const serverTrue = () => true;
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const actualIndex = (position: number) => ((position - 1) % count + count) % count;
const asset = (slug: string, suffix: string) => `/education/${slug}${suffix}`;

export function EducationCarousel({ locale }: { locale: Locale }) {
  const labels = educationLabels[locale];
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const [moving, setMoving] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, serverFalse);
  const pageVisible = useSyncExternalStore(subscribeVisibility, getPageVisible, serverTrue);
  const bodyRef = useRef<HTMLDivElement>(null);
  const disclosureRef = useRef<HTMLDetailsElement>(null);
  const disclosureAnimationRef = useRef<Animation | null>(null);
  const revealAnimationRef = useRef<Animation | null>(null);
  const expandedRef = useRef(false);
  const gestureRef = useRef<{ x: number; y: number } | null>(null);
  const current = actualIndex(position);
  const rotating = open && autoPlay && !hovered && !focused && inView && pageVisible && !reducedMotion;

  useEffect(() => () => {
    disclosureAnimationRef.current?.cancel();
    revealAnimationRef.current?.cancel();
  }, []);

  const toggleDisclosure = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const element = disclosureRef.current;
    const body = bodyRef.current;
    if (!element || !body) return;
    const expanding = !(disclosureAnimationRef.current ? expandedRef.current : element.open);
    const startHeight = element.getBoundingClientRect().height;
    expandedRef.current = expanding;
    setOpen(expanding);
    disclosureAnimationRef.current?.cancel();
    revealAnimationRef.current?.cancel();
    disclosureAnimationRef.current = null;
    element.open = true;
    if (reducedMotion) {
      element.open = expanding;
      element.style.overflow = "";
      return;
    }
    const borders = getComputedStyle(element);
    const closedHeight = event.currentTarget.getBoundingClientRect().height
      + parseFloat(borders.borderTopWidth) + parseFloat(borders.borderBottomWidth);
    const endHeight = expanding ? element.getBoundingClientRect().height : closedHeight;
    const duration = expanding ? 560 : 360;
    const easing = "cubic-bezier(.4, 0, .2, 1)";
    element.style.overflow = "hidden";
    const animation = element.animate([
      { height: `${startHeight}px` }, { height: `${endHeight}px` },
    ], { duration, easing });
    disclosureAnimationRef.current = animation;
    revealAnimationRef.current = body.animate(expanding ? [
      { opacity: 0, transform: "translateY(-14px)" }, { opacity: 1, transform: "translateY(0)" },
    ] : [
      { opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-8px)" },
    ], { duration, easing });
    void animation.finished.then(() => {
      if (disclosureAnimationRef.current !== animation) return;
      element.open = expanding;
      element.style.overflow = "";
      disclosureAnimationRef.current = null;
    }, () => {});
  };

  const advance = useCallback((direction: number) => {
    if (moving) return;
    if (reducedMotion) {
      setPosition((value) => actualIndex(value + direction) + 1);
    } else {
      setMoving(true);
      setPosition((value) => value + direction);
    }
  }, [moving, reducedMotion]);

  useEffect(() => {
    if (!rotating || moving) return;
    const timer = window.setTimeout(() => advance(1), 5000);
    return () => window.clearTimeout(timer);
  }, [rotating, moving, advance]);

  useEffect(() => {
    const element = bodyRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (animated) return;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setAnimated(true));
    });
    return () => { window.cancelAnimationFrame(firstFrame); window.cancelAnimationFrame(secondFrame); };
  }, [animated]);

  // Also settle when reduced-motion changes or the section closes mid-transition.
  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => {
      if (position === 0 || position === count + 1) {
        setAnimated(false);
        setPosition(actualIndex(position) + 1);
      }
      setMoving(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [moving, position]);

  const settle = () => {
    if (position === 0 || position === count + 1) {
      setAnimated(false);
      setPosition(current + 1);
    }
    setMoving(false);
  };

  const arrowKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      advance(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <details className="credentials" ref={disclosureRef} onToggle={(event) => {
      if (!disclosureAnimationRef.current) {
        expandedRef.current = event.currentTarget.open;
        setOpen(event.currentTarget.open);
      }
    }}>
      <summary className="credentials-summary" onClick={toggleDisclosure}>
        <div>{labels.title}<small>{labels.count}</small></div>
        <b aria-hidden="true">+</b>
      </summary>
      <div
        className="credential-carousel"
        ref={bodyRef}
        role="region"
        aria-roledescription={locale === "ru" ? "карусель" : "carousel"}
        aria-label={labels.carousel}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
        <div
          className="credential-viewport"
          onPointerDown={(event) => {
            if (event.pointerType === "touch") gestureRef.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerCancel={() => { gestureRef.current = null; }}
          onPointerUp={(event) => {
            const start = gestureRef.current;
            gestureRef.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              advance(dx < 0 ? 1 : -1);
            }
          }}
        >
          <div
            className={`credential-track${animated && !reducedMotion ? " is-animated" : ""}`}
            style={{ transform: `translateX(-${position * 100}%)` }}
            onTransitionEnd={(event) => { if (event.target === event.currentTarget && event.propertyName === "transform") settle(); }}
          >
            {slides.map((item, index) => {
              const active = index === position;
              return (
                <article className="credential-slide" aria-hidden={!active} key={`${item.slug}-${index}`}>
                  <div className="credential-image">
                    <img src={asset(item.slug, "-preview.webp")} alt={`${item.title[locale]}, ${item.year}`} width="480" height="340" loading="lazy" draggable={false} />
                  </div>
                  <div className="credential-copy">
                    <p className="credential-year">{item.year}</p>
                    <h3>{item.title[locale]}</h3>
                    <p className="credential-detail">{item.detail[locale]}</p>
                    <p className="credential-institution">{item.institution[locale]}</p>
                    <p className="credential-copy-note">{labels.copyNote}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="credential-controls">
          <div className="credential-arrows">
            <button type="button" aria-label={labels.previous} onClick={() => advance(-1)} onKeyDown={arrowKey} disabled={moving}>←</button>
            <span className="credential-counter" aria-live={rotating ? "off" : "polite"}>{String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
            <button type="button" aria-label={labels.next} onClick={() => advance(1)} onKeyDown={arrowKey} disabled={moving}>→</button>
          </div>
          <div className="credential-dots" role="group" aria-label={labels.carousel}>
            {educationDocuments.map((item, index) => (
              <button key={item.slug} type="button" aria-label={`${labels.goTo} ${index + 1}: ${item.title[locale]}`} aria-current={index === current ? "true" : undefined} disabled={moving} onClick={() => { setPosition(index + 1); setMoving(!reducedMotion && index !== current); }}><span /></button>
            ))}
          </div>
          {reducedMotion ? <span className="credential-manual">{labels.manual}</span> : (
            <button className="credential-play" type="button" aria-pressed={!autoPlay} onClick={() => { setAutoPlay(!autoPlay); if (!autoPlay) setFocused(false); }}>
              <span aria-hidden="true">{autoPlay ? "Ⅱ" : "▶"}</span> {autoPlay ? labels.pause : labels.play}
            </button>
          )}
        </div>
      </div>
    </details>
  );
}
