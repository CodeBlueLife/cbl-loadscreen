import { Badge } from "@/components/ui/badge";

export function SidebarHeader() {
  return (
    <div className="p-8 border-b border-slate-700/50 flex-shrink-0">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">
            C<span className="text-blue-400">B</span>L
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Code<span className="text-blue-400">Blue</span>Life
          </h1>
          <p className="text-slate-300 text-base font-medium">
            Welcome, <span className="text-blue-400">Placeholder</span>!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 h-6">
        <Badge
          variant="outline"
          className="border-green-500/50 text-green-400 bg-slate-800/30"
        >
          Total Playtime: 40h 55m
        </Badge>
      </div>
    </div>
  );
}
