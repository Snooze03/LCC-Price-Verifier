import { useState } from "react";
import BranchTables from "../components/ui/branchTables";
import { AddBranch, EditAccount } from "../components/ui/buttonCards";
import { OpeningCardBranch } from "../components/ui/card";
import AddBranchModal from "../Modals/AddBranchModal";

export default function BranchAccounts() {
  const [showModal, setShowModal] = useState(false);

  return (
    <OpeningCardBranch>
      <div className="bg-white rounded-lg shadow p-6 border border-gray-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold">ACTIVE BRANCHES</p>
            <p>
              Manage secure access and database configuration for regional
              storefronts.
            </p>
          </div>
          <div className="flex gap-2">
            <EditAccount />
            <div>
              <AddBranch onClick={() => setShowModal(true)} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
        <BranchTables />
      </div>

      <div className="justify-center flex gap-3 pagination">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a className="active" href="#">
          2
        </a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div>

      {/* Modal */}
      {showModal && <AddBranchModal setShowModal={setShowModal} />}
    </OpeningCardBranch>
  );
}
{
  /* <AddBranchModal setShowModal={setShowModal} /> */
}
