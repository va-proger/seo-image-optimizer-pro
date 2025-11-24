import { useState, useCallback, useRef, useEffect } from "react";

import Dropzone from "./components/Dropzone";
import FileList from "./components/FileList";
import SettingsPanel from "./components/SettingsPanel/SettingsPanel";
import ExportPanel from "./components/ExportPanel";
import Footer from "./components/Footer";
import ModalAbout from "./components/ModalAbout";
import CookiesModal from "./components/CookiesModal";
import ShareButton from "./components/ShareButton";

import { createFileModel } from "./utils/file";
import { generateZip } from "./utils/zip";
import OptimizerWorker from "./workers/optimizer.worker.js?worker";

const PRESETS = {
  seo: {
    title: "SEO Universal",
    quality: 0.8,
    format: "image/webp",
    sizes: [320, 640, 1024, 1536],
    stripMetadata: true,
  },
  blog: {
    title: "Blog HD",
    quality: 0.9,
    format: "image/webp",
    sizes: [640, 1024, 1536, 2048],
    stripMetadata: true,
  },
  ecommerce: {
    title: "E-commerce",
    quality: 0.75,
    format: "image/webp",
    sizes: [320, 640, 1024],
    stripMetadata: true,
  },
  perf: {
    title: "WebPerf",
    quality: 0.6,
    format: "image/webp",
    sizes: [320, 640, 1024],
    stripMetadata: true,
  },
  retina: {
    title: "Retina",
    quality: 0.85,
    format: "image/webp",
    sizes: [768, 1280, 1920],
    stripMetadata: true,
  },
  mobile: {
    title: "Mobile-first",
    quality: 0.8,
    format: "image/webp",
    sizes: [320, 480, 640, 960],
    stripMetadata: true,
  },
  fullhd: {
    title: "Full HD",
    quality: 0.85,
    format: "image/webp",
    sizes: [800, 1280, 1600, 1920],
    stripMetadata: true,
  },
  avif4k: {
    title: "4K AVIF",
    quality: 0.85,
    format: "image/avif",
    sizes: [1024, 1536, 2048, 3840],
    stripMetadata: false,
  },
  social: {
    title: "Social OG",
    quality: 0.9,
    format: "image/jpeg",
    sizes: [1200],
    stripMetadata: true,
  },
  thumbs: {
    title: "Thumbnails",
    quality: 0.7,
    format: "image/webp",
    sizes: [64, 128, 256],
    stripMetadata: true,
  },
};

export default function App() {
  const [files, setFiles] = useState([]);
  const [batchProgress, setBatchProgress] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'dark');  // Init из storage
  const [settings, setSettings] = useState(PRESETS.seo);
  const [activePreset, setActivePreset] = useState("seo");
  const [aboutOpen, setAboutOpen] = useState(false);
  // const inputRef = useRef(null);
  const workerRef = useRef(null);
  const filesRef = useRef(files);

  const hasUnoptimized = files.some((f) => !f.optimized);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {  // Только если не сохранено
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);
  const toggleTheme = () => {
    const next = !theme;
    setTheme(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    workerRef.current = new OptimizerWorker();
    return () => workerRef.current?.terminate();
  }, []);

  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.onmessage = (e) => {
      const { id, status, payload } = e.data;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
              ...f,
              workerStatus: status,
              optimized: status === "done" ? payload : f.optimized,
            }
            : f
        )
      );
    };
  }, []);

  const resetOptimized = () => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        optimized: null,
        workerStatus: null,
      }))
    );
  };

  const updateSettings = (next) => {
    setSettings((s) => {
      const updated = typeof next === "function" ? next(s) : next;
      resetOptimized();
      return updated;
    });
  };

  const applyPreset = (key, preset) => {
    setActivePreset(key);
    updateSettings(preset);
  };

  function waitForDone(id) {
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        const f = filesRef.current.find((i) => i.id === id);
        if (f?.workerStatus === "done") {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }

  const optimizeAll = async () => {
    if (!hasUnoptimized) return;

    setBatchProgress(0);
    const total = filesRef.current.length;
    let done = 0;

    for (const file of filesRef.current) {
      if (!file.optimized) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, workerStatus: "queued" } : f
          )
        );

        workerRef.current.postMessage({
          id: file.id,
          file: file.file,
          settings,
        });

        await waitForDone(file.id);
      }

      done++;
      setBatchProgress(Math.round((done / total) * 100));
    }
  };

  const handleFiles = useCallback(async (fileList) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];

    const realFiles = Array.from(fileList).filter((f) =>
      allowed.includes(f.type)
    );

    const models = [];
    for (const file of realFiles) {
      const model = await createFileModel(file);
      models.push(model);
    }

    setFiles((prev) => [...prev, ...models]);
  }, []);

  const updateAlt = (id, text) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, alt: text } : f))
    );
  };

  const optimizeOne = (file) => {
    workerRef.current.postMessage({
      id: file.id,
      file: file.file,
      settings,
    });

    setFiles((prev) =>
      prev.map((f) =>
        f.id === file.id ? { ...f, workerStatus: "queued" } : f
      )
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:text-slate-100 text-slate-900">
      <div className="w-full max-w-7xl mx-auto dark:bg-slate-900/80 bg-white/80 dark:border-slate-800 border border-gray-200 rounded-3xl shadow-2xl backdrop-blur-xl p-6 sm:p-8 lg:p-10">


        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight dark:text-slate-100 text-slate-900">
              SEO Image Optimizer Pro
            </h1>
            <p className="dark:text-slate-400 text-slate-600 text-sm md:text-base mt-1">
              Оптимизация изображений для Web / SEO / Performance — прямо в браузере.
            </p>
            <button
              onClick={() => setAboutOpen(true)}
              className="text-xs px-3 py-1 dark:bg-slate-800 bg-gray-200 dark:border-slate-700 border border-gray-300 rounded-lg hover:dark:bg-slate-700 hover:bg-gray-300"
            >
              О проекте
            </button>
            <button
              onClick={toggleTheme}
              className="ml-2 text-xs px-3 py-1 dark:bg-slate-800 bg-gray-200 dark:border-slate-700 border border-gray-300 rounded-lg hover:dark:bg-slate-700 hover:bg-gray-300"
            >
              {theme ? 'Светлая' : 'Тёмная'}
            </button>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-3 text-xs">
            <span className="px-3 py-1 dark:bg-emerald-500/10 bg-emerald-500/5 dark:text-emerald-300 text-emerald-700 dark:border-emerald-500/40 border border-emerald-500/20 rounded-full">
              PWA Ready
            </span>
            <span className="px-3 py-1 dark:bg-sky-500/10 bg-sky-500/5 dark:text-sky-300 text-sky-700 dark:border-sky-500/40 border border-sky-500/20 rounded-full">
              Client-side only
            </span>
          </div>
        </header>

        <main className="grid gap-8 lg:grid-cols-1 xl:grid-cols-[2fr_1fr]">

          {/* LEFT SIDE */}
          <section className="space-y-4 min-w-0">
            <Dropzone onFiles={handleFiles} />

            <FileList
              files={files}
              onAltChange={updateAlt}
              onOptimize={optimizeOne}
            />
          </section>

          {/* RIGHT SIDE */}
          <aside className="space-y-4 min-w-0">
            <SettingsPanel
              settings={settings}
              onChange={updateSettings}
              presets={PRESETS}
              activePreset={activePreset}
              onPresetSelect={applyPreset}
            />

            <ExportPanel
              batchProgress={batchProgress}
              canOptimize={hasUnoptimized}
              onOptimize={optimizeAll}
              onDownload={() => generateZip(files)}
              disabled={files.length === 0}
            />
          </aside>

        </main>
      </div>
      <Footer />
      <ShareButton />
      <ModalAbout open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <CookiesModal />
    </div>
  );
}
