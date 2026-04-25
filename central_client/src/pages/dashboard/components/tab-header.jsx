export function TabHeader({ children }) {
    return (
        <div className="flex justify-between items-center px-5 py-3 border border-gray-200 rounded-md shadow-sm">
            {children}
        </div>
    );
}

export function TabTitle({ children }) {
    return <h1 className="text-lg font-bold">{children}</h1>;
}
