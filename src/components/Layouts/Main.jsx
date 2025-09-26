import { useState } from "react";
import logo from "../../assets/image/logo.png";
import "./MainStyle.css";

const Main = () => {
  const [amount, setAmount] = useState("");
  const [qrisUrl, setQrisUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateQris = async () => {
    if (!amount || isNaN(amount)) {
      alert("Masukkan nominal yang valid!");
      return;
    }

    setLoading(true);
    try {
      
      const qrApi = `https://api.qrserver.com/v1/create-qr-code/?data=PAYMENT-${amount}&size=250x250`;
      
      // const res = await fetch("/api/duitku-qris", {
      //   method: "POST",
      //   body: JSON.stringify({ amount }),
      //   headers: { "Content-Type": "application/json" },
      // });
      // const data = await res.json();
      // setQrisUrl(data.qr_url);

      setQrisUrl(qrApi);
    } catch (err) {
      console.error("Gagal generate QRIS:", err);
      alert("Terjadi kesalahan saat generate QRIS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex items-center gap-3 mb-10">
        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
        <h1 className="text-4xl font-bold text-[#004D4C]">Request QRIS</h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px] text-center">
        <label className="block mb-4 text-lg font-semibold text-gray-700">
          Masukkan nominal
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="contoh: 50000"
          className="w-full border rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#004D4C]"
        />
        <button
          onClick={handleGenerateQris}
          disabled={loading}
          className="bg-[#004D4C] hover:bg-[#003d3c] text-white px-5 py-3 rounded-lg w-full transition-colors"
        >
          {loading ? "Generating..." : "Generate QRIS"}
        </button>

        {qrisUrl && (
          <div className="mt-8 flex flex-col items-center">
            <img src={qrisUrl} alt="QRIS" className="w-64 h-64" />
            <p className="mt-3 text-lg font-bold text-[#004D4C]">
              Rp {parseInt(amount).toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-500">
              Scan QRIS di atas untuk melakukan pembayaran
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
