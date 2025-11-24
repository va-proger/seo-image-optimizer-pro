export default function Presets({ presets, activePreset, onSelect }) {
  return (
    <div>
      <h3 className="mb-2 text-xs uppercase tracking-wider font-semibold dark:text-slate-500 text-gray-600">
        Пресеты
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onSelect(key, preset)}
            className={
              "px-3 py-2 rounded-xl border transition-all duration-150 text-left " +
              (activePreset === key
                ? "dark:border-sky-400 border-sky-500 dark:bg-slate-700 bg-sky-50 ring-1 ring-sky-500/50 dark:text-slate-100 text-sky-900"
                : "dark:border-slate-600 border-gray-300 dark:bg-slate-800 bg-white hover:dark:bg-slate-700 hover:bg-gray-50 dark:text-slate-300 text-gray-700")
            }
          >
            <div className="font-semibold">
              {preset.title || key.toUpperCase()}
            </div>

            <div className="text-[11px] text-slate-400">
              {preset.format.replace("image/", "")}, {preset.sizes.join(" / ")}px
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
