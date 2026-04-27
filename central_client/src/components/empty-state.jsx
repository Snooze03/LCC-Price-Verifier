export function EmptyState({ title, description }) {
    return (
        <div className="flex flex-col w-full min-h-full p-5  justify-center items-center border-2 border-gray-400 border-dashed divide-dotted rounded-lg">
            <h2 className="text-gray-500 font-bold">{title}</h2>
            <p className="text-sm text-gray-400 font-medium">{description}</p>
        </div>
    );
}
