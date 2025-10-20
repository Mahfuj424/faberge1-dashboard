import React from "react";
import { MailOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";

// 🔹 Mock contact messages JSON
const contactMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Issue with Booking",
    message: "Hi, I’m facing issues while booking a manicure appointment.",
    date: "2025-10-10",
  },
  {
    id: 2,
    name: "Sophia Allen",
    email: "sophia@gmail.com",
    subject: "Payment not received",
    message: "I completed the payment but it’s not showing in my account.",
    date: "2025-10-15",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michaelb@gmail.com",
    subject: "Feedback on Service",
    message: "Your nail art service was wonderful! Keep it up 💅",
    date: "2025-10-18",
  },
];

const HelpSupport = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-white min-h-screen">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Help & Support Messages
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-left text-gray-700">
          <thead className="bg-pink-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 w-[150px]">Name</th>
              <th className="px-6 py-3 w-[200px]">Email</th>
              <th className="px-6 py-3 w-[180px]">Subject</th>
              <th className="px-6 py-3 w-[300px]">Message</th>
              <th className="px-6 py-3 w-[120px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {contactMessages.map((msg) => (
              <tr
                key={msg.id}
                className="border-b border-pink-100 hover:bg-pink-50 transition-all"
              >
                <td className="px-6 py-3 flex items-center gap-2">
                  <UserOutlined className="text-[#e91e63]" />
                  <span>{msg.name}</span>
                </td>

                <td className="px-6 py-3">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#e91e63] hover:underline"
                  >
                    <MailOutlined /> {msg.email}
                  </a>
                </td>

                <td className="px-6 py-3">{msg.subject}</td>

                <td className="px-6 py-3 flex items-start gap-2">
                  <MessageOutlined className="text-gray-400 mt-[2px]" />
                  <p className="text-gray-600 truncate max-w-[280px]">
                    {msg.message}
                  </p>
                </td>

                <td className="px-6 py-3 text-gray-500">{msg.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HelpSupport;
