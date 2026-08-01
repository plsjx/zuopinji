import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/works/maimai-character-960.webp",
    alt: "Miyagi 的 AI 角色视觉作品",
    label: "AI 角色视觉",
  },
  {
    image: "/works/sports-earbuds-960.webp",
    alt: "Miyagi 的运动耳机电商视觉作品",
    label: "电商产品视觉",
  },
  {
    image: "/works/hydrating-skincare-960.webp",
    alt: "Miyagi 的护肤产品视觉作品",
    label: "美妆详情视觉",
  },
  {
    image: "/works/camera-poster-960.webp",
    alt: "Miyagi 的相机产品视觉作品",
    label: "产品海报练习",
  },
];

export default function ProfileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const selectSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <article
      className="portraitCard profileCarousel"
      aria-roledescription="轮播图"
      aria-label="Miyagi 个人作品轮播"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") selectSlide(activeIndex - 1);
        if (event.key === "ArrowRight") selectSlide(activeIndex + 1);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 45) {
          selectSlide(activeIndex + (distance < 0 ? 1 : -1));
        }
        touchStartX.current = null;
      }}
    >
      <div className="carouselViewport">
        {slides.map((slide, index) => (
          <figure
            className={`carouselSlide ${index === activeIndex ? "isActive" : ""}`}
            aria-hidden={index !== activeIndex}
            key={slide.image}
          >
            <img
              src={slide.image}
              srcSet={`${slide.image.replace("-960.webp", "-480.webp")} 480w, ${slide.image} 960w`}
              sizes="(max-width: 760px) 100vw, 42vw"
              alt={slide.alt}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
            />
            <figcaption>{slide.label}</figcaption>
          </figure>
        ))}

        <div className="carouselControls">
          <button
            type="button"
            aria-label="上一张作品"
            onClick={() => selectSlide(activeIndex - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="下一张作品"
            onClick={() => selectSlide(activeIndex + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="portraitMeta">
        <div>
          <strong>Miyagi</strong>
          <span>学生 / 杭州方向</span>
        </div>
        <div className="carouselDots" aria-label="选择轮播图片">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === activeIndex ? "isActive" : ""}
              aria-label={`查看${slide.label}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => selectSlide(index)}
              key={slide.image}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
