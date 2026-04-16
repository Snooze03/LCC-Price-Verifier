export function Card({ children, className = "" }) {
  return (
    <div
      className={`flex w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6  ${className}`}
    >
      {/* bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 */}
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`flex flex-col gap-1  ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h1 className="text-2xl font-semibold text-slate-800">{children}</h1>;
}

export function CardDescription({ children, className = "" }) {
  return <p className="text-sm text-slate-400">{children}</p>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>;
}
export function CardFooter({ children, className = "" }) {
  return (
    <p className="text-sm text-slate-400 flex justify-center">{children}</p>
  );
}

export function OpeningCardBranch({ children, className = "" }) {
  return (
    <div className="bg-mist-100 h-full min-h-full p-4 flex flex-col gap-4">
      {children}
    </div>
  );
}
