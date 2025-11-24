export default function ExportPanel({
  batchProgress,
  canOptimize,
  onOptimize,
  onDownload,
  disabled,
}) {
  return (
    <div className="dark:bg-slate-950/40 bg-gray-50/40 dark:border-slate-800 border border-gray-200 rounded-2xl p-4 space-y-4 shadow-sm dark:shadow-none backdrop-blur-sm">
      <h2 className="font-semibold text-xs uppercase tracking-wider dark:text-slate-400 text-gray-600">
        Экспорт
      </h2>

      {batchProgress > 0 && batchProgress < 100 && (
        <div className="w-full dark:bg-slate-800 bg-gray-200 rounded-full overflow-hidden h-2 mb-2 relative">
          <div
            className="h-full bg-sky-500 transition-all duration-300 ease-out absolute inset-0 rounded-full"
            style={{ width: `${batchProgress}%` }}
            role="progressbar"
            aria-valuenow={batchProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono dark:text-slate-600 text-slate-400 pointer-events-none">
            {batchProgress}%
          </span>
        </div>
      )}

      <button
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 text-slate-950 font-semibold text-sm hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sky-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        disabled={!canOptimize || disabled}
        onClick={onOptimize}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Оптимизировать всё
      </button>

      <button
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        disabled={disabled}
        onClick={onDownload}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Скачать ZIP
      </button>
    </div>
  );
}
