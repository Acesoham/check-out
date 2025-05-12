import React from "react";
import { Clock } from "lucide-react"; // Import the clock icon

const AplliedFormsHistory = () => {
  const formsData = [
    {
      id: 1,
      applicationId: "APP-2024-00123",
      certificateType: "Resident Certificate",
      status: "Approved",
      appliedDate: "5/10/2024",
      approvalDate: "5/15/2024",
      remark: "Verified successfully",
    },
    {
      id: 3,
      applicationId: "APP-2024-00167",
      certificateType: "Caste Certificate",
      status: "Rejected",
      appliedDate: "5/8/2024",
      approvalDate: "5/10/2024",
      remark: "Incomplete documents",
    },
    {
      id: 4,
      applicationId: "APP-2024-00189",
      certificateType: "Birth Certificate",
      status: "Approved",
      appliedDate: "5/5/2024",
      approvalDate: "5/8/2024",
      remark: "Processed quickly",
    },
    {
      id: 5,
      applicationId: "APP-2024-00201",
      certificateType: "Marriage Certificate",
      status: "Approved",
      appliedDate: "5/1/2024",
      approvalDate: "5/6/2024",
      remark: "Approved without issues",
    },
    {
      id: 6,
      applicationId: "APP-2024-00215",
      certificateType: "Death Certificate",
      status: "Rejected",
      appliedDate: "5/3/2024",
      approvalDate: "5/5/2024",
      remark: "Missing required documents",
    },
    {
      id: 7,
      applicationId: "APP-2024-00230",
      certificateType: "Property Tax Exemption",
      status: "Approved",
      appliedDate: "5/7/2024",
      approvalDate: "5/10/2024",
      remark: "Processed successfully",
    },
    {
      id: 8,
      applicationId: "APP-2024-00245",
      certificateType: "Income Certificate",
      status: "Rejected",
      appliedDate: "5/9/2024",
      approvalDate: "5/11/2024",
      remark: "Verification failed",
    },
    {
      id: 9,
      applicationId: "APP-2024-00260",
      certificateType: "Caste Certificate",
      status: "Approved",
      appliedDate: "5/12/2024",
      approvalDate: "5/15/2024",
      remark: "Approved after review",
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
          <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-bounce" />
          <span>Applied Forms History</span>
        </h1>
      </div>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200">
              <th className="px-6 py-3 text-left font-semibold">Sr. No</th>
              <th className="px-6 py-3 text-left font-semibold">Application ID</th>
              <th className="px-6 py-3 text-left font-semibold">Certificate Type</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Applied Date</th>
              <th className="px-6 py-3 text-left font-semibold">Approval Date</th>
              <th className="px-6 py-3 text-left font-semibold">View Details</th>
              <th className="px-6 py-3 text-left font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
            {formsData.map((form, index) => (
              <tr
                key={form.id}
                className={`transition-transform duration-200 ${
                  form.status === "Approved"
                    ? "bg-green-50 dark:bg-green-900 hover:scale-102 hover:shadow-md"
                    : "bg-red-50 dark:bg-red-900 hover:scale-102 hover:shadow-md"
                }`}
              >
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">
                  <div className="transform-none">{index + 1}</div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{form.applicationId}</td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{form.certificateType}</td>
                <td className="px-6 py-4 text-sm font-bold text-center">
                  <button
                    className={`px-3 py-1 rounded-full text-white ${
                      form.status === "Approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {form.status}
                  </button>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{form.appliedDate}</td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">{form.approvalDate}</td>
                <td className="px-6 py-4">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                    View Details
                  </button>
                </td>
                <td
                  className={`px-6 py-4 font-bold ${
                    form.status === "Approved"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {form.remark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Showing 1 to {formsData.length} of {formsData.length} entries
          </span>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplliedFormsHistory;
