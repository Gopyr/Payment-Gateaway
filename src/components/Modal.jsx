import { useState } from "react";
import { createUser } from "../utils/users/service";
import { createTransaction } from "../utils/payments/service";

const ModalContent = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const grossAmount = parseInt(amount);

    if (isNaN(grossAmount) || grossAmount <= 0) {
      setError("Nominal pembayaran tidak valid");
      setLoading(false);
      return;
    }

    const transactionData = {
      grossAmount,
      customerDetails: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
      },
    };

    try {
      // Buat user
      await createUser(transactionData.customerDetails);

      // Buat transaksi
      const transactionResponse = await createTransaction(transactionData);

      // Redirect ke halaman QRIS (jika API return URL)
      if (transactionResponse?.redirect_url) {
        window.location.href = transactionResponse.redirect_url;
      } else {
        setError("Tidak ada URL pembayaran dari server");
      }

      onClose();
    } catch (err) {
      console.error("Error:", err);
      setError("Gagal membuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative p-4 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Request Pembayaran QRIS
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            {/* Nama */}
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Email & Phone */}
            <div className="flex gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Nomor HP"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Nominal */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Nominal Pembayaran (Rp)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contoh: 50000"
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border rounded-lg text-gray-600"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Buat QRIS"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
