import React, { useContext, useEffect, useState } from "react";
import {
  Bell,
  Check,
  X,
  Heart,
  Users,
  MessageCircle,
  Settings,
  Filter,
  MoreVertical,
  IndianRupee,
  HeartOff,
  UserPlus,
  ShieldCheck,
  Megaphone,
  CheckCircle,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendDomain } from "../App";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Notifications = () => {
  const [openOptionId, setOpenOptionId] = useState(null);
  const { user, verifyUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const iconMap = {
    Heart: Heart,
    HeartOff: HeartOff,
    UserPlus: UserPlus,
    Bell: Bell,
    IndianRupee: IndianRupee,
    MessageCircle: MessageCircle,
    Users: Users,
    ShieldCheck: ShieldCheck,
    Megaphone: Megaphone,
    CheckCircle: CheckCircle,
  };
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    if (!user) {
      setTimeout(getNotifications, 1000);
    }
    const allNotifications = user.notifications;
    setNotifications(allNotifications.slice().reverse());
  };
  useEffect(() => {
    getNotifications();
  }, [user]);

  const filterOptions = [
    { value: "all", label: "All Notifications", count: notifications.length },
    {
      value: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
    },
    {
      value: "donation",
      label: "Donations",
      count: notifications.filter((n) => n.type === "donation").length,
    },
    {
      value: "campaign",
      label: "Campaigns",
      count: notifications.filter((n) => n.type === "campaign").length,
    },
    {
      value: "social",
      label: "Social",
      count: notifications.filter((n) => n.type === "social").length,
    },
    {
      value: "system",
      label: "System",
      count: notifications.filter((n) => n.type === "system").length,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = async (id) => {
    axios
      .patch(`${backendDomain}/read`, { uId: user._id, nId: id })
      .then((res) => {
        if (res.data.success) {
          verifyUser();
        }
      });
  };

  const unRead = async (id) => {
    axios
      .patch(`${backendDomain}/unread`, { uId: user._id, nId: id })
      .then((res) => {
        if (res.data.success) {
          verifyUser();
        }
      });
  };

  const markAllAsRead = async () => {
    await axios
      .patch(`${backendDomain}/readAll`, { uId: user._id })
      .then((res) => {
        if (res.data.success) {
          verifyUser();
        }
      });
  };

  const deleteNotification = async (id) => {
    await axios
      .delete(`${backendDomain}/notify`, { data: { uId: user._id, nId: id } })
      .then((res) => {
        if (res.data.success) {
          verifyUser();
        }
      });
  };
  const deleteAll = async () => {
    await axios
      .delete(`${backendDomain}/notifyAll`, { data: { uId: user._id } })
      .then((res) => {
        if (res.data.success) {
          verifyUser();
        }
      });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-dark-900 dark:via-dark-800 dark:to-dark-900  py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-200 mb-2">
                Notifications
              </h1>
              <p className="text-lg text-gray-600 dark:text-dark-400">
                Stay updated with your campaigns and donations
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800">
                    {unreadCount} unread
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={deleteAll}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:bg-dark-700 dark:hover:text-dark-400 rounded-lg hover:bg-gray-100"
                >
                  Delete all
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-200">
              Filter Notifications
            </h2>
            <Filter className="h-5 w-5 text-gray-400 dark:text-dark-400" />
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === option.value
                    ? "bg-linear-to-r from-emerald-600 to-green-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-dark-700/80 dark:hover:text-emerald-600"
                }`}
              >
                {option.label}
                {option.count > 0 && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filter === option.value
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 dark:bg-dark-800 text-gray-600 dark:text-dark-400"
                    }`}
                  >
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification, idx) => {
              const IconComponent = iconMap[notification.icon];
              return (
                <div
                  key={idx}
                  className={`relative bg-white dark:bg-dark-800 rounded-2xl shadow-md border transition-all duration-200 hover:shadow-lg ${
                    notification.read
                      ? "border-gray-100 dark:border-dark-600"
                      : "border-emerald-200 dark:border-dark-400 bg-emerald-50/30 "
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`bg-linear-to-br  ${notification.color}  dark:border-dark-600 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg shrink-0`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                        <div className=" hidden bg-white from-pink-500 to-rose-600  from-gray-500 to-gray-700 from-green-500 to-emerald-600 from-emerald-500 to-green-600 from-indigo-500 to-purple-600 "></div>
                        {/* replacement of safelist for dynamic rendering of class and safelist not availaible in v4 .  */}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3
                              className={`text-lg font-semibold mb-1 ${
                                notification.read
                                  ? "text-gray-900 dark:text-dark-300"
                                  : "text-emerald-900 dark:text-dark-200"
                              }`}
                            >
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 bg-emerald-600 dark:bg-green-600 rounded-full inline-block"></span>
                              )}
                            </h3>
                            <p className="text-gray-600 dark:text-dark-400 mb-2 leading-relaxed">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500">
                              {dayjs(Number(notification.time)).fromNow()}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification._id)
                              }
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-dark-700 rounded-lg transition-colors"
                              title="Delete notification"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setOpenOptionId(notification._id)}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            {openOptionId === notification._id && (
                              <div className="absolute right-3 top-0 mt-2 w-64 rounded-xl shadow-lg bg-white dark:bg-dark-800 ring-1 ring-black ring-opacity-5 focus:outline-hidden border border-gray-100 dark:border-dark-700">
                                <div className="border-gray-100 dark:border-dark-700 mt-2 pb-2">
                                  {notification.read ? (
                                    <button
                                      onClick={() => {
                                        unRead(notification._id);
                                        setOpenOptionId(null);
                                      }}
                                      className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-dark-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
                                    >
                                      Mark as unread
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        markAsRead(notification._id);
                                        setOpenOptionId(null);
                                      }}
                                      className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-dark-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200"
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                  <button
                                    onClick={() => {
                                      deleteNotification(notification._id);
                                      setOpenOptionId(null);
                                    }}
                                    className="group flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {notification.actionUrl && (
                          <div className="mt-4">
                            <button
                              onClick={() => {
                                navigate(notification.actionUrl);
                              }}
                              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm dark:hover:text-green-600/90"
                            >
                              View Details →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-dark-800 dark:border-dark-600 rounded-2xl shadow-md p-12 text-center border border-gray-100">
              <Bell className="h-16 w-16 text-gray-300 dark:text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-200 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-600 dark:text-dark-400">
                {filter === "all"
                  ? "You're all caught up! No notifications to show."
                  : `No ${filter} notifications found. Try changing your filter.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
