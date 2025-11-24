import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SEO Image Optimizer Pro",
          text: "Оптимизация изображений прямо в браузере",
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copy if user cancels
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);  // Flash feedback
    } catch (err) {
      // Legacy fallback: Prompt (rare, IE-era)
      prompt("Скопируйте ссылку:", window.location.href);
    }
  };

  return (
    <button
      onClick={share}
      className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg dark:bg-slate-800 bg-gray-200 dark:border-slate-600 border border-gray-300 dark:text-slate-200 text-slate-800 font-medium hover:dark:bg-slate-700 hover:bg-gray-300 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 active:scale-95"
      aria-label="Поделиться ссылкой на инструмент"
      role="button"
    >
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z"
        />
      </svg>
      Поделиться
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-emerald-500 text-slate-950 rounded-md whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
          Скопировано!
        </span>
      )}
    </button>
  );
}