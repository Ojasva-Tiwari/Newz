import { AlertTriangle, Bell, Clock, Info, ShieldAlert } from "lucide-react";
import { AlertSeverity, LocalAlert } from "../../types";

const severityConfig: Record<
  AlertSeverity,
  {
    border: string;
    bg: string;
    text: string;
    badgeBg: string;
    icon: typeof Info;
  }
> = {
  info: {
    border: "border-blue-500/20",
    bg: "bg-blue-500/5 dark:bg-blue-500/10",
    text: "text-blue-800 dark:text-blue-300",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  advisory: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/5 dark:bg-amber-500/10",
    text: "text-amber-800 dark:text-amber-300",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  warning: {
    border: "border-orange-500/20",
    bg: "bg-orange-500/5 dark:bg-orange-500/10",
    text: "text-orange-800 dark:text-orange-300",
    badgeBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    icon: AlertTriangle,
  },
  urgent: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    text: "text-rose-800 dark:text-rose-300",
    badgeBg: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
    icon: ShieldAlert,
  },
};

export function LocalAlertsSection({ alerts }: { alerts: LocalAlert[] }) {
  if (!alerts.length) return null;

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const conf = severityConfig[alert.severity] || severityConfig.info;
        const IconComponent = conf.icon;

        return (
          <div
            key={alert.id}
            className={`rounded-2xl border p-4 transition ${conf.border} ${conf.bg}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <IconComponent size={16} className={conf.text} />
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${conf.badgeBg}`}
                >
                  {alert.severity} · {alert.type}
                </span>
                <span className="text-xs font-bold text-ink dark:text-white">
                  {alert.title}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-muted dark:text-slate-400">
                <Clock size={12} />
                <span>Issued {alert.issuedAt}</span>
                {alert.isDemo && (
                  <span className="rounded bg-black/5 px-1.5 py-0.5 text-[9px] font-bold uppercase dark:bg-white/10">
                    Sample Notice
                  </span>
                )}
              </div>
            </div>

            <p className={`mt-2 text-xs leading-5 ${conf.text}`}>
              {alert.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
