import { useState } from "react";

export default function CookiesModal() {
  const [show, setShow] = useState(() => !localStorage.getItem("seo_opt_cookies"));

  const accept = () => {
    localStorage.setItem("seo_opt_cookies", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 dark:bg-slate-800 bg-white dark:border-slate-600 border border-gray-200 p-4 sm:p-5 rounded-xl shadow-2xl dark:shadow-black/30 shadow-gray-300/50 max-w-xs text-sm z-50 animate-in slide-in-from-bottom-2 duration-300 fade-in-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookies-title"
      aria-describedby="cookies-desc"
    >
      <h3 id="cookies-title" className="font-semibold text-xs uppercase tracking-wider mb-2 dark:text-slate-200 text-slate-800">
        Приватность
      </h3>
      <p id="cookies-desc" className="dark:text-slate-300 text-slate-700 leading-relaxed mb-4">
        Мы не сохраняем ваши изображения. Все файлы обрабатываются локально в браузере.
      </p>
      <button
        className="w-full px-4 py-2 rounded-lg bg-sky-500 dark:bg-sky-500 hover:bg-sky-400 dark:hover:bg-sky-600 text-slate-950 font-semibold text-xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 active:scale-95"
        onClick={accept}
        autoFocus
      >
        Понятно
      </button>
    </div>
  );
}