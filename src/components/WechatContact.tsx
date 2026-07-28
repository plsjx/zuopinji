import { useEffect, useState } from "react";

export default function WechatContact() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button className="navCta" type="button" onClick={() => setIsOpen(true)}>
        联系我
      </button>
      {isOpen && (
        <div className="wechatModal" role="dialog" aria-modal="true" aria-label="微信联系方式">
          <button
            className="wechatBackdrop"
            type="button"
            aria-label="关闭微信二维码"
            onClick={() => setIsOpen(false)}
          />
          <div className="wechatDialog">
            <button
              className="wechatClose"
              type="button"
              aria-label="关闭"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <p>微信联系</p>
            <h2>扫一扫，添加 Miyagi</h2>
            <img src="/wechat-miyagi.png" alt="Miyagi 微信二维码" />
            <span>浙江杭州 · 学习与项目交流</span>
          </div>
        </div>
      )}
    </>
  );
}
