export default function Spinner() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="w-2 h-2 bg-slate-700 rounded-full animate-wave" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-slate-700 rounded-full animate-wave" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-slate-700 rounded-full animate-wave" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}
