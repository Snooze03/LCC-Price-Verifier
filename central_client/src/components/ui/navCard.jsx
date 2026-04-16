export function NavCardHeader({ children, className = "" }) {
  return <div className="px-6 pb-6">{children}</div>;
}

export function NavCardSideBar({ children, className = "" }) {
  return (
    <aside className="w-60 bg-[#1a1a2e] text-white flex flex-col py-6 shrink-0">
      {children}
    </aside>
  );
}
