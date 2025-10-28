import React from "react";

const mockTransactions = [
  {
    id: 1,
    userName: "John S.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    service: "Mani, Pedi, Water, Gel",
    date: "10/10/2025",
    paymentMethod: "Stripe",
    amount: "$50",
    transactionId: "TXN-845932",
  },
  {
    id: 2,
    userName: "Alice M.",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    service: "Pedicure, Gel",
    date: "10/12/2025",
    paymentMethod: "PayPal",
    amount: "$60",
    transactionId: "TXN-349502",
  },
  {
    id: 3,
    userName: "David R.",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    service: "Nail Art, Water",
    date: "11/01/2025",
    paymentMethod: "Card",
    amount: "$40",
    transactionId: "TXN-762394",
  },
];

const TransactionsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Transactions
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-pink-100">
        <table className="w-full text-sm text-left text-gray-700 min-w-[900px]">
          <thead className="bg-pink-50 uppercase text-xs text-gray-600">
            <tr>
              <th className="px-6 py-3">User Name</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Payment Method</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Transaction ID</th>
            </tr>
          </thead>

          <tbody>
            {mockTransactions.map((item) => (
              <tr
                key={item.id}
                className="border-b border-pink-100 hover:bg-pink-50 transition-all"
              >
                {/* User Name */}
                <td className="px-6 py-3 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.userName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-[#e91e63] font-medium cursor-pointer hover:underline">
                    {item.userName}
                  </span>
                </td>

                {/* Service */}
                <td className="px-6 py-3 text-gray-700">{item.service}</td>

                {/* Date */}
                <td className="px-6 py-3 text-gray-600">{item.date}</td>

                {/* Payment Method */}
                <td className="px-6 py-3 text-gray-700">
                  <span className="font-medium">{item.paymentMethod}</span>
                </td>

                {/* Amount */}
                <td className="px-6 py-3 font-semibold text-gray-800">
                  {item.amount}
                </td>

                {/* Transaction ID */}
                <td className="px-6 py-3 text-gray-600 font-mono">
                  {item.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
