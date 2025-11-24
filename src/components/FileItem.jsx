export default function FileItem({ file, onAltChange, onOptimize }) {
  const largest = file.optimized?.at(-1);

  return (
    <li className="flex flex-col sm:flex-row items-start gap-4 dark:bg-slate-800/40 bg-gray-100/40 dark:border-slate-700 border border-gray-200 p-4 sm:p-3 rounded-xl min-w-0 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg transition-shadow duration-150">
      <div className="flex flex-col sm:flex-row items-start gap-4 w-full">

        <img
          src={file.previewUrl}
          className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-lg dark:border-slate-700 border border-gray-300 flex-shrink-0 lazy-load"
          alt={file.name}
        />

        <div className="flex-1 text-sm min-w-0 space-y-1">
          <div className="truncate font-semibold break-all dark:text-slate-100 text-slate-900">
            {file.name}
          </div>

          <div className="text-slate-500 dark:text-slate-400 text-gray-500 text-xs italic break-all">
            ALT: {file.alt}
          </div>
          <input
            type="text"
            value={file.alt}
            onChange={(e) => onAltChange(file.id, e.target.value)}
            placeholder="Введите ALT-текст"
            className="mt-1 text-xs dark:bg-slate-800 bg-white dark:border-slate-700 border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:text-slate-100 text-gray-900 transition-colors"
            aria-label={`ALT для ${file.name}`}
          />
          <div className=" text-slate-400 dark:text-slate-500 text-gray-500 text-xs whitespace-nowrap overflow-hidden "
            title={file.sizeHuman}>{file.sizeHuman}</div>

          <div className="text-slate-400 dark:text-slate-500 text-gray-500 text-xs">
            {file.workerStatus === "queued" && (
              <span className="inline-flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                В очереди…
              </span>
            )}
            {file.workerStatus === "loading" && (
              <span className="inline-flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Загрузка…
              </span>
            )}
            {file.workerStatus === "resizing" && (
              <span className="inline-flex items-center gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Изменение размера…
              </span>
            )}
            {file.workerStatus === "encoding" && (
              <span className="inline-flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                Кодирование…
              </span>
            )}
            {file.workerStatus === "done" && (
              <span className="inline-flex items-center gap-1 text-emerald-400 dark:text-emerald-300">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                Готово → {largest ? (largest.size / 1024).toFixed(1) : "—"} KB
              </span>
            )}
          </div>

          {!file.optimized && (
            <button
              onClick={() => onOptimize(file)}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-sky-500 dark:text-slate-950 text-slate-50 font-semibold hover:bg-sky-400 dark:hover:bg-sky-600 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              aria-label={`Оптимизировать файл ${file.name}`}
            >
              Оптимизировать
            </button>
          )}

        </div>
      </div>
    </li>
  );
}
