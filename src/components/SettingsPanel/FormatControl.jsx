export default function FormatControl({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 text-xs uppercase tracking-wider font-medium dark:text-slate-400 text-gray-600">Формат</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg dark:bg-slate-800 bg-white dark:border-slate-700 border border-gray-300 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:text-slate-100 text-gray-900"
      >
        <option value="image/webp">WebP</option>
        <option value="image/avif">AVIF</option>
        <option value="image/jpeg">JPEG</option>
      </select>
    </div>
  );
}
