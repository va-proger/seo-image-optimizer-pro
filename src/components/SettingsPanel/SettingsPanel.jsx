import QualityControl from "./QualityControl";
import FormatControl from "./FormatControl";
import SizeControl from "./SizeControl";
import MetaControl from "./MetaControl";
import Presets from "./Presets";

export default function SettingsPanel({
  settings,
  onChange,
  presets,
  activePreset,
  onPresetSelect,
}) {
  return (
    <div className="dark:bg-slate-950/40 bg-gray-50/40 dark:border-slate-800 border border-gray-200 rounded-2xl p-4 space-y-4 shadow-sm dark:shadow-none backdrop-blur-sm">
      <h2 className="font-semibold text-sm uppercase tracking-wider dark:text-slate-400 text-gray-600">
        Настройки оптимизации
      </h2>

      <QualityControl
        value={settings.quality}
        onChange={(v) => onChange((s) => ({ ...s, quality: v }))}
      />

      <FormatControl
        value={settings.format}
        onChange={(v) => onChange((s) => ({ ...s, format: v }))}
      />

      <SizeControl
        value={settings.sizes}
        onChange={(list) => onChange((s) => ({ ...s, sizes: list }))}
      />

      <MetaControl
        value={settings.stripMetadata}
        onChange={(v) => onChange((s) => ({ ...s, stripMetadata: v }))}
      />

      <Presets
        presets={presets}
        activePreset={activePreset}
        onSelect={onPresetSelect}
      />
    </div>
  );
}
