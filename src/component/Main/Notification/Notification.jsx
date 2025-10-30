import React from "react";

const mockNotifications = [
  {
    id: 1,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
  {
    id: 2,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
  {
    id: 3,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
  {
    id: 4,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
  {
    id: 5,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
  {
    id: 6,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
  {
    id: 7,
    type: "Manicure",
    recipient: "Classic manicure with nail shaping, cuticle care",
    subject: "Booking Confirmation",
    status: "Delivered",
    date: "10/12/2025",
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen p-6 overflow-x-auto md:w-[420px] lg:w-[680px] xl:w-full">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-5">
        Notifications
      </h1>

      {/* Notifications Table */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-pink-50">
        <table className="min-w-[900px] w-full text-sm text-gray-700">
          <thead className="bg-pink-50 text-gray-700 uppercase text-sm font-bold">
            <tr>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Recipient</th>
              <th className="px-6 py-3 text-left">Subject</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Date</th>
            </tr>
          </thead>

          <tbody>
            {mockNotifications.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-400 hover:bg-pink-50 transition-all text-sm"
              >
                <td className="px-6 py-3">{item.type}</td>
                <td className="px-6 py-3">{item.recipient}</td>
                <td className="px-6 py-3">{item.subject}</td>
                <td className="px-6 py-3">
                  <span
                    className={`text-sm ${
                      item.status === "Delivered"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
