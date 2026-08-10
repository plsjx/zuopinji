import { lazy, Suspense, useEffect, useState } from "react";
import ProfileCarousel from "./components/ProfileCarousel";
import BorderGlow from "./components/BorderGlow";
import MotionSystem from "./components/MotionSystem";
import WechatContact from "./components/WechatContact";

const Particles = lazy(() => import("./components/Particles"));

function DeferredParticles() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return undefined;

    const windowWithIdleCallback = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const handle = windowWithIdleCallback.requestIdleCallback
      ? windowWithIdleCallback.requestIdleCallback(() => setIsReady(true), { timeout: 1200 })
      : window.setTimeout(() => setIsReady(true), 400);

    return () => {
      if (windowWithIdleCallback.cancelIdleCallback) {
        windowWithIdleCallback.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, []);

  if (!isReady) return null;

  return (
    <Suspense fallback={null}>
      <Particles
        particleColors={["#39c2b1"]}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        particleHoverFactor={0.8}
        alphaParticles={false}
        sizeRandomness={1}
        cameraDistance={20}
        disableRotation={false}
        pixelRatio={1}
      />
    </Suspense>
  );
}

const navItems = [
  { label: "关于", href: "#experience" },
  { label: "作品", href: "#projects" },
  { label: "能力", href: "#strengths" },
  { label: "联系", href: "#contact" },
];

const stats = [
  { value: "14", label: "张个人作品收录" },
  { value: "3", label: "类视觉练习方向" },
  { value: "长期", label: "杭州实习目标" },
];

const featuredProjects = [
  {
    title: "电商产品视觉练习",
    type: "商品海报 / 促销设计 / 信息层级",
    image: "/works/sports-earbuds-960.webp",
    description:
      "围绕耳机、相机、鞋服、洗护等商品练习电商视觉表达，重点处理产品主体、价格信息、卖点标签和促销氛围之间的关系。",
    tags: ["电商海报", "产品卖点", "促销版式"],
  },
  {
    title: "AI 角色与风格化视觉",
    type: "AI 视觉 / 角色海报 / 风格实验",
    image: "/works/maimai-character-960.webp",
    description:
      "尝试使用更强烈的角色视觉、竖排文字和图像层次制造记忆点，探索二次元风格在个人视觉练习中的表现方式。",
    tags: ["AI 视觉", "角色设计", "风格实验"],
  },
  {
    title: "生活方式产品海报",
    type: "美妆洗护 / 母婴用品 / 氛围表达",
    image: "/works/hydrating-skincare-960.webp",
    description:
      "用浅色、蓝色、水感和柔和光影表现洗护、美妆、母婴类产品的干净感与信任感，练习更柔和的商业视觉语言。",
    tags: ["洗护美妆", "氛围视觉", "版面组织"],
  },
];

const works = [
  {
    title: "4D 环绕立体声耳机",
    category: "电商海报",
    image: "/works/headphone-4d-960.webp",
  },
  {
    title: "拍立得相机海报",
    category: "产品视觉",
    image: "/works/camera-poster-960.webp",
  },
  {
    title: "佳洁士牙膏海报",
    category: "品牌练习",
    image: "/works/crest-toothpaste-960.webp",
  },
  {
    title: "香薰产品海报",
    category: "生活方式",
    image: "/works/fragrance-diffuser-960.webp",
  },
  {
    title: "童鞋促销海报",
    category: "促销设计",
    image: "/works/shoes-promo-960.webp",
  },
  {
    title: "无线耳机促销页",
    category: "电商海报",
    image: "/works/earbuds-black-960.webp",
  },
  {
    title: "母婴用品横幅",
    category: "活动 Banner",
    image: "/works/baby-care-banner-960.webp",
  },
  {
    title: "控油洗发水海报",
    category: "洗护产品",
    image: "/works/honey-shampoo-960.webp",
  },
  {
    title: "零食会员活动横幅",
    category: "活动视觉",
    image: "/works/snack-banner-960.webp",
  },
  {
    title: "Maimai DX 角色海报",
    category: "AI 视觉",
    image: "/works/maimai-character-960.webp",
  },
  {
    title: "蓝色护肤促销页",
    category: "美妆海报",
    image: "/works/skincare-blue-960.webp",
  },
  {
    title: "兔子枕头详情视觉",
    category: "产品场景",
    image: "/works/rabbit-pillow-960.webp",
  },
  {
    title: "运动耳机详情海报",
    category: "科技产品",
    image: "/works/sports-earbuds-960.webp",
  },
  {
    title: "高保湿护肤详情页",
    category: "美妆详情",
    image: "/works/hydrating-skincare-960.webp",
  },
];

const strengths = [
  {
    title: "电商版式组织",
    text: "能把标题、价格、卖点、按钮和产品主体放进清晰的视觉层级里，适合继续训练详情页和活动页设计。",
  },
  {
    title: "产品视觉表达",
    text: "目前作品覆盖耳机、相机、洗护、美妆、母婴、食品等品类，正在建立不同商品的画面处理经验。",
  },
  {
    title: "AI 与素材整合",
    text: "会通过检索、素材整理和 AI 辅助生成补足画面元素，再用设计软件完成排版与商业化表达。",
  },
  {
    title: "学习与执行",
    text: "我现在还是学生，没有正式职业身份，但能持续产出练习作品，也希望通过长期实习把能力打磨得更扎实。",
  },
];

const contacts = [
  { label: "电话", value: "18958065109", href: "tel:18958065109" },
  { label: "邮箱", value: "2877311858@qq.com", href: "mailto:2877311858@qq.com" },
  { label: "城市", value: "杭州 / 长期实习", href: "#experience" },
];

export default function Home() {
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const activeWork = activeWorkIndex === null ? null : works[activeWorkIndex];

  useEffect(() => {
    if (activeWorkIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveWorkIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveWorkIndex((current) =>
          current === null ? null : (current - 1 + works.length) % works.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveWorkIndex((current) =>
          current === null ? null : (current + 1) % works.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeWorkIndex]);

  return (
    <main className="siteBody">
      <MotionSystem />
      <section className="hero section" id="top">
        <div className="ambientCanvas" aria-hidden="true" />
        <div className="particleLayer" aria-hidden="true">
          <DeferredParticles />
        </div>
        <div className="heroNoise" aria-hidden="true" />
        <nav className="topbar shell" aria-label="主导航">
          <a className="brand" href="#top" aria-label="Miyagi 作品集">
            MIYAGI
          </a>
          <div className="navLinks">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <WechatContact />
        </nav>

        <div className="heroContent shell">
          <div className="heroKicker">
            <span>学生作品集 / 2026</span>
            <span>网络营销与直播电商在读 / 视觉设计练习</span>
          </div>
          <h1 className="heroTitle">
            <span>Miyagi</span>
            <span>作品集</span>
          </h1>
          <div className="heroBottom">
            <p>
              聚焦电商海报、产品详情、AI 角色视觉与品牌活动页面，在不同品类和视觉风格中持续探索更清晰、更有记忆点的设计表达。
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#projects">
                查看作品
              </a>
              <a className="ghostButton" href="mailto:2877311858@qq.com">
                发送邮件
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section experience" id="experience">
        <div className="shell sectionGrid">
          <aside className="sectionIntro">
            <p className="sectionTitleEn">关于</p>
            <div className="sectionLabel">
              <span>01</span>
              <p>个人介绍</p>
            </div>
            <h2>我还在学习阶段，正在通过大量练习建立视觉设计的基础判断。</h2>
          </aside>

          <div className="journeyLayout">
            <BorderGlow className="profileGlow" edgeSensitivity={24} glowRadius={28}>
              <ProfileCarousel />
            </BorderGlow>

            <div className="journeyPanel">
              <div className="bioCard">
                <p>当前状态</p>
                <h3>
                  我就读于浙江育英职业技术学院网络营销与直播电商专业，正在学习电商运营、图文设计、线上内容表达和数据处理。
                </h3>
                <p className="bioCopy">
                  目前作品主要来自课程练习、个人练习和 AI 辅助视觉实验。我希望把这些作品整理成更专业的作品集，也希望后续通过实习接触真实项目，提升画面完成度、商业理解和交付能力。
                </p>
              </div>

              <div className="stats">
                {stats.map((stat) => (
                  <div className="statCard" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="contactList">
                {contacts.map((contact) => (
                  <a key={contact.label} href={contact.href}>
                    <span>{contact.label}</span>
                    {contact.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shell videoShowcase">
          <header className="videoShowcaseHeader">
            <div>
              <span>VIDEO / 2026</span>
              <h2>动态视频作品</h2>
            </div>
            <p>近期完成的动态视觉练习，点击画面即可播放并开启声音。</p>
          </header>

          <div className="videoGrid">
            <article className="videoCard">
              <div className="videoFrame">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/videos/video-aug10-poster.webp"
                  aria-label="播放8月10日视频作品"
                >
                  <source src="/videos/video-aug10.mp4" type="video/mp4" />
                  您的浏览器暂不支持视频播放。
                </video>
              </div>
              <div className="videoCardCopy">
                <span>01 / MOTION STUDY</span>
                <h3>岛村动画练习</h3>
                <p>短篇动态视觉练习，尝试节奏、构图与角色画面的结合。</p>
              </div>
            </article>

            <article className="videoCard">
              <div className="videoFrame">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/videos/video-aug08-poster.webp"
                  aria-label="播放8月8日视频作品"
                >
                  <source src="/videos/video-aug08.mp4" type="video/mp4" />
                  您的浏览器暂不支持视频播放。
                </video>
              </div>
              <div className="videoCardCopy">
                <span>02 / VIDEO PRACTICE</span>
                <h3>TEVI快闪破碎练习</h3>
                <p>完整动态设计练习，记录画面转场、文字与视觉氛围的表达。</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="shell sectionGridWide">
          <aside className="sectionIntro">
            <p className="sectionTitleEn">作品</p>
            <div className="sectionLabel">
              <span>02</span>
              <p>代表方向</p>
            </div>
            <h2>把已有作品按“电商产品、AI 角色、生活方式”三个方向重新陈列。</h2>
          </aside>

          <div className="projectStack">
            {featuredProjects.map((project, index) => (
              <article
                className={index === 0 ? "projectCard featuredProject" : "projectCard"}
                key={project.title}
              >
                <div className="projectVisual">
                  <img
                    src={project.image}
                    srcSet={`${project.image.replace("-960.webp", "-480.webp")} 480w, ${project.image} 960w`}
                    sizes="(max-width: 760px) 100vw, 52vw"
                    alt={`${project.title} 预览图`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="projectCopy">
                  <p className="projectType">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tagRow">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="shell galleryShell">
          <div className="galleryHeader">
            <p className="sectionTitleEn">图库</p>
            <h2>个人作品收录</h2>
          </div>
          <div className="workGallery">
            {works.map((work, index) => (
              <button
                type="button"
                className={`workTile ${index % 5 === 0 ? "workTileLarge" : ""}`}
                key={work.image}
                aria-label={`查看${work.title}全图`}
                onClick={() => setActiveWorkIndex(index)}
              >
                <img
                  src={work.image}
                  srcSet={`${work.image.replace("-960.webp", "-480.webp")} 480w, ${work.image} 960w`}
                  sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={work.title}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span>{work.category}</span>
                  <h3>{work.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeWork && activeWorkIndex !== null && (
          <div
            className="imageLightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeWork.title}全图`}
          >
            <button
              className="imageLightboxBackdrop"
              type="button"
              aria-label="关闭全图"
              onClick={() => setActiveWorkIndex(null)}
            />
            <div className="imageLightboxDialog">
              <header className="imageLightboxHeader">
                <div>
                  <span>{activeWork.category}</span>
                  <strong>{activeWork.title}</strong>
                </div>
                <small>
                  {activeWorkIndex + 1} / {works.length}
                </small>
                <button
                  className="imageLightboxClose"
                  type="button"
                  aria-label="关闭全图"
                  onClick={() => setActiveWorkIndex(null)}
                >
                  ×
                </button>
              </header>
              <figure>
                <img
                  src={activeWork.image}
                  alt={activeWork.title}
                  decoding="async"
                />
              </figure>
              <footer className="imageLightboxFooter">
                <button
                  className="imageLightboxNav"
                  type="button"
                  aria-label="查看上一张作品"
                  onClick={() =>
                    setActiveWorkIndex(
                      (activeWorkIndex - 1 + works.length) % works.length,
                    )
                  }
                >
                  <span aria-hidden="true">←</span>
                  上一张
                </button>
                <p>使用键盘方向键切换，Esc 关闭</p>
                <button
                  className="imageLightboxNav"
                  type="button"
                  aria-label="查看下一张作品"
                  onClick={() =>
                    setActiveWorkIndex((activeWorkIndex + 1) % works.length)
                  }
                >
                  下一张
                  <span aria-hidden="true">→</span>
                </button>
              </footer>
            </div>
          </div>
        )}
      </section>

      <section className="section strengths" id="strengths">
        <div className="shell sectionGrid">
          <aside className="sectionIntro">
            <p className="sectionTitleEn">能力</p>
            <div className="sectionLabel">
              <span>03</span>
              <p>学习方向</p>
            </div>
            <h2>现在不是包装“资深身份”，而是清楚展示我正在练什么、能做什么。</h2>
          </aside>

          <div className="strengthGrid">
            {strengths.map((item, index) => (
              <article className="strengthCard" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contactSection section" id="contact">
        <div className="shell contactGrid">
          <div>
            <p className="sectionTitleEn">联系</p>
            <div className="sectionLabel">
              <span>04</span>
              <p>联系方式</p>
            </div>
            <h2>如果你愿意给学生一个真实项目机会，我会认真学习并稳定执行。</h2>
          </div>
          <div className="contactPanel">
            <a href="mailto:2877311858@qq.com">2877311858@qq.com</a>
            <a href="tel:18958065109">18958065109</a>
            <p>期望城市：杭州。可长期实习，方向偏视觉设计、电商设计、AI 辅助设计。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
