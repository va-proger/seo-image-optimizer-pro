import { motion, AnimatePresence } from "framer-motion";

export default function ModalCookies({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 dark:bg-black/50 bg-black/20 dark:backdrop-blur-sm backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 170, damping: 20 }}
            className="dark:bg-slate-900 bg-white dark:text-slate-200 text-slate-800 border dark:border-slate-700 border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-2xl dark:shadow-xl dark:shadow-black/20 shadow-gray-200/50"
          >
            <h2 className="text-xl font-bold mb-3 dark:text-slate-100 text-slate-900">Cookies & Local Storage</h2>

            <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed mb-4">
              <strong>SEO Image Optimizer Pro</strong> использует только{" "}
              <strong>локальное хранилище (localStorage)</strong> для сохранения:
              <br />• выбранной темы (dark/light)<br />
              • пользовательских настроек оптимизации<br />
              • состояния интерфейса
            </p>

            <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed mb-4">
              Сервис использует технические cookies и localStorage, необходимые для работы
              интерфейса: темы оформления, выбор настроек и состояние приложения.
            </p>

            <p className="dark:text-slate-300 text-slate-700 text-sm mb-3">
              Также могут применяться аналитические инструменты
              (Google Analytics, Яндекс Метрика) для получения обезличенной статистики
              о посещениях. Эти данные не позволяют идентифицировать пользователя.
            </p>

            <p className="dark:text-slate-400 text-slate-600 text-xs mb-5">
              Мы не используем маркетинговые или рекламные трекеры. Данные не передаются
              третьим лицам, за исключением аналитических сервисов.
            </p>


            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl dark:bg-slate-800 bg-gray-100 dark:border-slate-700 border border-gray-300 dark:text-slate-100 text-slate-800 font-semibold text-sm hover:dark:bg-slate-700 hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Понятно
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
