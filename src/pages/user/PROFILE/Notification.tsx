import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react"; // Import the bell icon

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchNotifications = async () => {
      const mockNotifications: Notification[] = [
        {
          id: 1,
          title: "Form Submission Successful",
          message: "Your application for the Resident Certificate has been submitted successfully.",
          timestamp: "2025-05-01 10:00 AM",
        },
        {
          id: 2,
          title: "New Scheme Available",
          message: "A new scheme for property tax exemption is now available. Check it out!",
          timestamp: "2025-05-02 02:30 PM",
        },
        {
          id: 3,
          title: "Reminder",
          message: "Don't forget to complete your pending application for the Birth Certificate.",
          timestamp: "2025-05-03 09:15 AM",
        },
        {
          id: 4,
          title: "Application Rejected",
          message: "Your application for the Income Certificate has been rejected due to missing documents.",
          timestamp: "2025-05-04 11:00 AM",
        },
        {
          id: 5,
          title: "Form Approved",
          message: "Your application for the Caste Certificate has been approved.",
          timestamp: "2025-05-05 01:45 PM",
        },
        {
          id: 6,
          title: "Reminder",
          message: "Please upload the required documents for your pending application.",
          timestamp: "2025-05-06 08:30 AM",
        },
        {
          id: 7,
          title: "Form Submission Successful",
          message: "Your application for the Property Tax Exemption has been submitted successfully.",
          timestamp: "2025-05-07 03:20 PM",
        },
        {
          id: 8,
          title: "New Update",
          message: "The government has introduced a new scheme for senior citizens. Check it out!",
          timestamp: "2025-05-08 10:00 AM",
        },
        {
          id: 9,
          title: "Reminder",
          message: "Your application for the Marriage Certificate is pending approval.",
          timestamp: "2025-05-09 09:00 AM",
        },
        {
          id: 10,
          title: "Form Approved",
          message: "Your application for the Death Certificate has been approved.",
          timestamp: "2025-05-10 04:15 PM",
        },
      ];

      // Filter notifications related to the user
      const userNotifications = mockNotifications.filter((notification) =>
        notification.title.toLowerCase().includes("form") ||
        notification.title.toLowerCase().includes("reminder")
      );

      setNotifications(userNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 text-center flex items-center justify-center space-x-2">
        <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-bounce" />
        <span>Notifications</span>
      </h1>
      <hr className="border-t-2 border-gray-300 dark:border-gray-700 mb-6" />
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-lg hover:border-transparent hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500"
          >
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {notification.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
            <span className="text-xs text-gray-500 dark:text-gray-500">{notification.timestamp}</span>
            <div className="mt-4 flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                View Details
              </button>
              <button
                onClick={() =>
                  setNotifications((prev) =>
                    prev.filter((n) => n.id !== notification.id)
                  )
                }
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
