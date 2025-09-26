// import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getProductById } from "../utils/products/services";
import { createUser } from "../utils/users/service";
import { createTransaction } from "../utils/payments/service";

const ModalContent = ({ onClose, product_id }) => {
  const id = product_id;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) return;

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0 || qty > product.quantity) {
      alert("Jumlah tidak valid atau melebihi stok");
      return;
    }

    const transactionData = {
      grossAmount: product.price * qty,
      customerDetails: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
      },
    };

    const userPayload = { ...transactionData.customerDetails };

    try {
      const response = await createUser(userPayload);
      const transactionResponse = await createTransaction(transactionData);

      console.log("User created successfully:", response);
      console.log("Transaction created successfully:", transactionResponse);

      // Redirect to midtrans payment page (optional)
      if (transactionResponse?.redirect_url) {
        window.location.href = transactionResponse.redirect_url;
      }

      onClose();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => {
        setProduct(data);
      });
    }
  }, [id]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Terms of Service
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} action="post" className="space-y-4">
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  id="default-search"
                  name="firstName"
                  className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                  placeholder="First Name"
                  required=""
                />
                <input
                  type="text"
                  id="default-search"
                  name="lastName"
                  className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                  placeholder="Last Name"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="relative text-gray-500 focus-within:text-gray-900">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" stroke-current ml-1"
                    >
                      <path
                        d="M1.87651 3.83325L6.79885 7.07932C8.55702 8.13423 9.43612 8.66169 10.402 8.6387C11.3678 8.61572 12.2208 8.04705 13.9268 6.90971L18.1232 3.83325M8.33317 14.6666H11.6665C14.8092 14.6666 16.3805 14.6666 17.3569 13.6903C18.3332 12.714 18.3332 11.1426 18.3332 7.99992C18.3332 4.85722 18.3332 3.28587 17.3569 2.30956C16.3805 1.33325 14.8092 1.33325 11.6665 1.33325H8.33317C5.19047 1.33325 3.61913 1.33325 2.64281 2.30956C1.6665 3.28587 1.6665 4.85722 1.6665 7.99992C1.6665 11.1426 1.6665 12.714 2.64281 13.6903C3.61913 14.6666 5.19047 14.6666 8.33317 14.6666Z"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="default-search"
                    name="email"
                    className="block max-w-xs pr-20 pl-12 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                    placeholder="name@pagedone.com"
                  />
                </div>
                <div className="relative">
                  <select
                    id="countries"
                    defaultValue="US"
                    className="w-16 text-gray-900 text-sm rounded-lg block absolute top-0 h-10 px-4 focus:outline-none"
                  >
                    <option value="US">IN</option>
                    <option value="CA">CA</option>
                    <option value="FR">Fr</option>
                  </select>

                  <input
                    type="text"
                    className="block w-full max-w-xs pr-4 pl-27 py-2  text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                    placeholder="+91 000 000 0000"
                    name="phone"
                  />
                </div>
              </div>
              <div className="relative w-full">
                <p className="text-sm text-gray-500">
                  Stok tersedia: {product?.quantity || 0}
                </p>

                <input
                  className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed"
                  type="text"
                  placeholder="Masukan Jumlah Barang yang ingin dibeli"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  id=""
                />
              </div>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                I accept
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
