export default function Footer() {
  return (
    <footer className="mt-10 text-center text-xs text-slate-500 opacity-60">
      <p>
        © {new Date().getFullYear()} VProger — SEO Image Optimizer Pro.
      </p>
      <p className="mt-1">
        Сделано с ❤️ •
        <a href="https://github.com/va-proger" className="hover:text-sky-400"> GitHub</a> •
        <a href="https://vk.com/vproger" className="hover:text-sky-400"> VK</a> •
        <a href="https://t.me/vproger" className="hover:text-sky-400"> Telegram</a>
      </p>
    </footer>
  );
}
