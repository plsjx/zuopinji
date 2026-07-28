"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionSystem() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.documentElement.classList.add("motionReady");
      return undefined;
    }

    const context = gsap.context(() => {
      document.documentElement.classList.add("motionReady");
      const opening = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => {
          document.querySelector(".openingAnimation")?.setAttribute("aria-hidden", "true");
        },
      });

      opening
        .fromTo(".openingMark", { yPercent: 110 }, { yPercent: 0, duration: 1.05 })
        .to(".openingMark", { yPercent: -115, duration: 0.8, delay: 0.2 })
        .to(".openingPanel", { scaleY: 0, duration: 1.15, stagger: 0.08 }, "-=0.62")
        .fromTo(
          ".heroTitle span",
          { yPercent: 125, scaleX: 0.68, opacity: 0 },
          { yPercent: 0, scaleX: 1, opacity: 1, duration: 1.4, stagger: 0.12 },
          "-=0.72",
        )
        .fromTo(
          [".topbar", ".heroKicker", ".heroBottom"],
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: "power3.out" },
          "-=0.82",
        )
        .set(".openingAnimation", { display: "none" });

      gsap.utils.toArray<HTMLElement>(".sectionIntro, .galleryHeader, .contactGrid").forEach((intro) => {
        const title = intro.querySelector(".sectionTitleEn");
        const copy = Array.from(intro.children).filter((child) => child !== title);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: "top 82%",
            once: true,
          },
        });
        if (title) {
          timeline.fromTo(
            title,
            { xPercent: -32, scaleX: 0.72, opacity: 0 },
            { xPercent: 0, scaleX: 1, opacity: 1, duration: 1.25, ease: "expo.out" },
          );
        }
        timeline.fromTo(
          copy,
          { y: 54, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
          "-=0.65",
        );
      });

      [
        ".journeyLayout > *",
        ".projectStack > *",
        ".workGallery > *",
        ".strengthGrid > *",
        ".contactPanel",
      ].forEach((selector) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 100, opacity: 0, clipPath: "inset(12% 0 0 0 round 24px)" },
              {
                y: 0,
                opacity: 1,
                clipPath: "inset(0% 0 0 0 round 24px)",
                duration: 1.15,
                stagger: 0.14,
                ease: "power4.out",
                overwrite: true,
              },
            ),
        });
      });

      const desktopMotion = gsap.matchMedia();
      desktopMotion.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".projectVisual, .workTileLarge").forEach((frame) => {
          const image = frame.querySelector("img");
          if (!image) return;
          gsap.fromTo(
            image,
            { scale: 1.1, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      });
    });

    return () => {
      context.revert();
      document.documentElement.classList.remove("motionReady");
    };
  }, []);

  return (
    <div className="openingAnimation" aria-label="Miyagi 作品集加载动画">
      <div className="openingPanel openingPanelLeft" />
      <div className="openingPanel openingPanelRight" />
      <div className="openingMarkMask">
        <span className="openingMark">MIYAGI / 2026</span>
      </div>
    </div>
  );
}
