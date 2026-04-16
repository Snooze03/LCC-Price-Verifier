export function EditAccount({ children, className = "" }) {
  return (
    <button
      className={`bg-white hover:bg-gray-200 text-blue-600 w-30 h-15 border rounded-lg shadow border-gray-300 px-4 py-2 ${className}`}
    >
      Edit Account
      {children}
    </button>
  );
}

export function AddBranch({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`text-white bg-[#0040A2] border-[#0040A2] hover:bg-[#0C56D0] w-40 h-15 border rounded-lg shadow px-4 py-2 ${className}`}
    >
      Add New Branch
      {children}
    </button>
  );
}

export function InputCard({ placeholder, type = "text" }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-3 bg-gray-50">
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
