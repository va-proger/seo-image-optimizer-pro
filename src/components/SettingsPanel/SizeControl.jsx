const ALL_SIZES = [320, 640, 1024, 1536, 2048, 3840];

export default function SizeControl({ value, onChange }) {
  const toggleSize = (sz) => {
    const exists = value.includes(sz);
    const updated = exists ? value.filter((v) => v !== sz) : [...value, sz];
    onChange(updated);
  };

  return (
    <div>
      <label className="text-xs uppercase tracking-wider font-medium dark:text-slate-400 text-gray-600">Responsive размеры</label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        {ALL_SIZES.map((sz) => (
          <label key={sz} className="flex items-center gap-2 p-2 rounded-lg dark:hover:bg-slate-800 hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={value.includes(sz)}
              onChange={() => toggleSize(sz)}
              className="w-4 h-4 text-sky-500 dark:bg-slate-700 bg-gray-200 border-2 border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
            />
            {sz}px
          </label>
        ))}
      </div>
    </div>
  );
}
