import Link from "next/link";
import { WirasatLogo } from "@/components/ui/WirasatLogo";
import { Home, Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full sacred-card p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl space-y-6">
        <div className="flex justify-center">
          <WirasatLogo variant="icon" color="emerald" size="lg" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            ERROR 404 • صفحہ دستیاب نہیں ہے
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-cinzel text-stone-900 dark:text-stone-100 pt-2">
            Page Not Found
          </h1>
          <p className="font-nastaliq text-xl text-stone-700 dark:text-stone-300 leading-[2.2]">
            یہ صفحہ موجود نہیں ہے یا اس کا پتہ تبدیل ہو چکا ہے۔
          </p>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            The page you are looking for doesn&apos;t exist or has been moved to another location.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl bg-[#245642] hover:bg-[#1a4031] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Home size={16} />
            <span>Return to Home / مرکزی صفحہ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
