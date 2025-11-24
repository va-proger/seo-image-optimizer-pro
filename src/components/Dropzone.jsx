import { useRef } from "react";

export default function Dropzone({ onFiles }) {
  const inputRef = useRef(null);

  const openDialog = () => inputRef.current?.click();

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      onFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className="relative border-2 border-dashed dark:border-slate-600/50 border-gray-300/50 rounded-2xl p-8 min-h-48 text-center hover:border-sky-500/70 dark:hover:bg-sky-500/5 hover:bg-sky-500/5 transition-all duration-200 cursor-pointer group" onClick={openDialog}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 dark:from-black/20 from-gray-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none bg-gradient-to-t" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <p className="text-xl font-light mb-3 dark:text-slate-300 text-gray-700">Перетащи изображения сюда</p>
        <p className="dark:text-slate-400 text-gray-500 text-sm mb-4">Или кликни для выбора (JPG, PNG, WebP, AVIF)</p>

        <button className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500 dark:text-slate-950 text-slate-50 font-semibold text-sm hover:bg-sky-400 transition-colors">
          Выбрать файлы
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={(e) => onFiles(e.target.files)}
      />
    </div>
  );
}
