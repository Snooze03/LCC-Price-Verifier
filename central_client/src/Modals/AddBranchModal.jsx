import { InputCard } from "../components/ui/buttonCards";

export default function AddBranchModal({ setShowModal }) {
  return (
    <div className="fixed inset-0 h-screen bg-black/50 z-10 flex justify-center items-center">
      <div className="bg-white p-4">
        <div className="flex flex-col gap-4 max-w-[400px]">
          <h1 className="text-xl font-bold">Add New Branch</h1>
          <InputCard placeholder="ID" type="number" />
          <InputCard placeholder="Store No." />
          <InputCard placeholder="Location" />
          <InputCard placeholder="DB Connection String" />
          <InputCard placeholder="DB Username" />
          <InputCard placeholder="DB Password" type="password" />
          <InputCard placeholder="Image Path" />
          <div className="flex gap-4 mt-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
              ADD
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
