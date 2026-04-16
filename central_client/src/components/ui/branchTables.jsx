const headers = [
  { id: 1, key: "id", label: "ID" },
  { id: 2, key: "storeNo", label: "Store No." },
  { id: 3, key: "location", label: "Location" },
  { id: 4, key: "db_connection_string", label: "DB Connection String" },
  { id: 5, key: "db_user_name", label: "DB Username" },
  { id: 6, key: "db_password", label: "DB Password" },
  { id: 7, key: "image_path", label: "Image Path" },
];

const data = [
  {
    id: 1,
    storeNo: "STR-001",
    location: "Makati City",
    db_connection_string: "Server=192.168.1.1;Database=store1",
    db_user_name: "admin1",
    db_password: "pass1234",
    image_path: "/images/store1.png",
  },
  {
    id: 2,
    storeNo: "STR-002",
    location: "Quezon City",
    db_connection_string: "Server=192.168.1.2;Database=store2",
    db_user_name: "admin2",
    db_password: "pass5678",
    image_path: "/images/store2.png",
  },
  {
    id: 3,
    storeNo: "STR-003",
    location: "Cebu City",
    db_connection_string: "Server=192.168.1.3;Database=store3",
    db_user_name: "admin3",
    db_password: "pass9012",
    image_path: "/images/store3.png",
  },
];

export default function BranchTables() {
  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-[#99AADF]">
        <tr>
          {headers.map((h) => (
            <th key={h.id} className="px-4 py-3">
              {h.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-300">
            {headers.map((h) => (
              <td key={h.id} className="px-4 py-3">
                {h.key === "db_password" ? "••••••••" : row[h.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
