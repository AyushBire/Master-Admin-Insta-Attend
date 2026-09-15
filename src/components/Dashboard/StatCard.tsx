import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import { colors } from "../../styles/theme";

export interface IndustryBreakdown {
  label: string;
  count: number;
  color?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBackground?: string;
  positive?: boolean;
  industryBreakdown?: IndustryBreakdown[];
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = colors.primary,
  iconBackground = colors.primaryLight,
  positive = true,
  industryBreakdown,
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (hovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setTooltipStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [hovered]);

  const total = industryBreakdown?.reduce((s, i) => s + i.count, 0) ?? 0;

  return (
    <div
      ref={cardRef}
      className="surface-card group relative p-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold leading-none text-text-primary">{value}</h2>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{ backgroundColor: iconBackground, color: iconColor }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span className={`font-semibold ${positive ? "text-success" : "text-error"}`}>{change}</span>
          <span className="text-text-muted">{changeLabel}</span>
        </div>
      )}

      {/* Portal tooltip — renders directly on body, always above everything */}
      {industryBreakdown && industryBreakdown.length > 0 &&
        hovered &&
        createPortal(
          <div
            style={tooltipStyle}
            className="rounded-xl border border-border bg-white p-4 shadow-[0_10px_40px_-8px_rgba(16,100,70,0.22)]"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Organization Breakdown
            </p>
            <div className="space-y-2.5">
              {industryBreakdown.map((item) => {
                const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
                return (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-text-primary">{item.label}</span>
                      <span className="text-text-muted">
                        {item.count.toLocaleString()}
                        <span className="ml-1 text-text-muted/70">· {pct}%</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-light">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: item.color ?? colors.primary,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}