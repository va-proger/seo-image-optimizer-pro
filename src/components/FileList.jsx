import FileItem from "./FileItem";

export default function FileList({ files, onAltChange, onOptimize }) {
  return (
    <div className="dark:bg-slate-950/40 bg-gray-50/40 dark:border-slate-800 border border-gray-200 rounded-2xl p-4 shadow-sm dark:shadow-none backdrop-blur-sm">
      <h2 className="font-semibold mb-3 text-xs uppercase tracking-wider dark:text-slate-400 text-gray-600">
        Загруженные файлы
      </h2>

      {files.length === 0 ? (
        <p className="dark:text-slate-500 text-gray-500 text-sm text-center py-8">Файлы не загружены.</p>
      ) : (
        <ul className="grid gap-4 sm:gap-5 grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 items-stretch">
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onAltChange={onAltChange}
              onOptimize={onOptimize}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
