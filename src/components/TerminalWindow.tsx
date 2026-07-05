export const TerminalWindow = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-lg border border-term-border bg-term-panel shadow-window overflow-hidden ${className}`}
  >
    <div className="flex items-center gap-2 px-4 py-2.5 bg-term-bgAlt border-b border-term-border">
      <span className="w-3 h-3 rounded-full bg-term-red" />
      <span className="w-3 h-3 rounded-full bg-term-yellow" />
      <span className="w-3 h-3 rounded-full bg-term-green" />
      <span className="ml-3 text-xs text-term-muted truncate">{title}</span>
    </div>
    <div className="p-4 sm:p-6">{children}</div>
  </div>
);
