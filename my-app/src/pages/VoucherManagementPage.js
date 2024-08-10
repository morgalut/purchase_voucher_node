import React, { useState, useEffect } from "react";
import {
  getAllVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../services/api";

const VoucherManagementPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [newVoucher, setNewVoucher] = useState({
    amount: "",
    cost: "",
    company: "",
  });
  const [editingVoucher, setEditingVoucher] = useState(null);

  useEffect(() => {
    fetchVouchers();
  }, []);


  const fetchVouchers = async () => {
    try {
      const response = await getAllVouchers();
      console.log('Fetched vouchers:', response.data); // Log the response
      if (Array.isArray(response.data)) {
        setVouchers(response.data);
      } else {
        console.error('Expected an array of vouchers');
        setVouchers([]);
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setVouchers([]);
    }
  };

  const handleCreateVoucher = async () => {
    try {
      await createVoucher(newVoucher);
      fetchVouchers();
      setNewVoucher({ amount: "", cost: "", company: "" });
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  const handleUpdateVoucher = async (id) => {
    try {
      await updateVoucher(
        id,
        editingVoucher.amount,
        editingVoucher.cost,
        editingVoucher.company
      );
      fetchVouchers();
      setEditingVoucher(null);
    } catch (error) {
      console.error("Error updating voucher:", error);
    }
  };

  const handleDeleteVoucher = async (id) => {
    try {
      await deleteVoucher(id);
      fetchVouchers();
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };

  return (
    <div>
      <h1>Voucher Management</h1>

      <div>
        <h2>Create Voucher</h2>
        <input
          type="number"
          placeholder="Amount"
          value={newVoucher.amount}
          onChange={(e) =>
            setNewVoucher({ ...newVoucher, amount: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Cost"
          value={newVoucher.cost}
          onChange={(e) =>
            setNewVoucher({ ...newVoucher, cost: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Company"
          value={newVoucher.company}
          onChange={(e) =>
            setNewVoucher({ ...newVoucher, company: e.target.value })
          }
        />
        <button onClick={handleCreateVoucher}>Create Voucher</button>
      </div>

      <div>
        <h2>Existing Vouchers</h2>
        <ul>
          {Array.isArray(vouchers) ? (
            vouchers.map((voucher) => (
              <li key={voucher._id}>
                {voucher.company} - {voucher.amount} units @ ${voucher.cost}{" "}
                each
                <button onClick={() => setEditingVoucher(voucher)}>Edit</button>
                <button onClick={() => handleDeleteVoucher(voucher._id)}>
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No vouchers available</p>
          )}
        </ul>
      </div>

      {editingVoucher && (
        <div>
          <h2>Edit Voucher</h2>
          <input
            type="number"
            placeholder="Amount"
            value={editingVoucher.amount}
            onChange={(e) =>
              setEditingVoucher({ ...editingVoucher, amount: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Cost"
            value={editingVoucher.cost}
            onChange={(e) =>
              setEditingVoucher({ ...editingVoucher, cost: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Company"
            value={editingVoucher.company}
            onChange={(e) =>
              setEditingVoucher({ ...editingVoucher, company: e.target.value })
            }
          />
          <button onClick={() => handleUpdateVoucher(editingVoucher._id)}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default VoucherManagementPage;
