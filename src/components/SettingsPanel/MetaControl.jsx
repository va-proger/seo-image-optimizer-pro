export default function MetaControl({ value, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-medium dark:text-slate-400 text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-sky-500 dark:bg-slate-700 bg-gray-200 border-2 border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
        />
        Удалять EXIF/метаданные
      </label>
    </div>
  );
}
