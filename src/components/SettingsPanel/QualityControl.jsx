export default function QualityControl({ value, onChange }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider font-medium dark:text-slate-400 text-gray-600 flex justify-between items-center">
        Качество:
        <span className="dark:text-slate-300 text-gray-700 font-mono">{Math.round(value * 100)}%</span>
      </label>

      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-sky-500 dark:bg-slate-700 bg-gray-200 border border-gray-300 dark:border-slate-600 rounded-full h-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-150 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:bg-sky-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-sky-500 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:hover:bg-sky-400"
      />
    </div>
  );
}
