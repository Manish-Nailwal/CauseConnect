import React, { useContext, useEffect, useState } from 'react';
import { Bell, Check, X, Heart, DollarSign, Users, MessageCircle, Settings, Filter, MoreVertical } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    toast.info("Coming Soon!");
    navigate('/')
  })
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'donation',
      title: 'New donation received',
      message: 'John Smith donated $100 to your campaign "Clean Water for Rural Villages"',
      time: '2 minutes ago',
      read: false,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      actionUrl: '/raiser/donations'
    },
    {
      id: '2',
      type: 'campaign',
      title: 'Campaign milestone reached',
      message: 'Your campaign "Education for Every Child" has reached 75% of its goal!',
      time: '1 hour ago',
      read: false,
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      actionUrl: '/fund/2'
    },
    {
      id: '3',
      type: 'social',
      title: 'New follower',
      message: 'Sarah Chen started following your campaigns',
      time: '3 hours ago',
      read: true,
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      actionUrl: '/profile'
    },
    {
      id: '4',
      type: 'message',
      title: 'New message from donor',
      message: 'Emily Johnson sent you a message about your reforestation project',
      time: '5 hours ago',
      read: true,
      icon: MessageCircle,
      color: 'from-purple-500 to-indigo-600',
      actionUrl: '/messages'
    },
    {
      id: '5',
      type: 'system',
      title: 'Campaign update reminder',
      message: 'Don\'t forget to post an update for your active campaigns',
      time: '1 day ago',
      read: true,
      icon: Bell,
      color: 'from-orange-500 to-red-600',
      actionUrl: '/raiser/campaigns'
    },
    {
      id: '6',
      type: 'donation',
      title: 'Thank you message sent',
      message: 'Your thank you message was delivered to 15 recent donors',
      time: '2 days ago',
      read: true,
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      actionUrl: '/raiser/donations'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'donation', label: 'Donations', count: notifications.filter(n => n.type === 'donation').length },
    { value: 'campaign', label: 'Campaigns', count: notifications.filter(n => n.type === 'campaign').length },
    { value: 'social', label: 'Social', count: notifications.filter(n => n.type === 'social').length },
    { value: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-lg text-gray-600">
                Stay updated with your campaigns and donations
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {unreadCount} unread
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  Mark all as read
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filter Notifications</h2>
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === option.value
                    ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {option.label}
                {option.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
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
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-md border transition-all duration-200 hover:shadow-lg ${
                  notification.read ? 'border-gray-100' : 'border-indigo-200 bg-indigo-50/30'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`bg-linear-to-br ${notification.color} rounded-xl w-12 h-12 flex items-center justify-center shadow-lg shrink-0`}>
                      <notification.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-1 ${
                            notification.read ? 'text-gray-900' : 'text-indigo-900'
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 w-2 h-2 bg-indigo-600 rounded-full inline-block"></span>
                            )}
                          </h3>
                          <p className="text-gray-600 mb-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-sm text-gray-500">{notification.time}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {notification.actionUrl && (
                        <div className="mt-4">
                          <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm hover:underline">
                            View Details →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "You're all caught up! No notifications to show."
                  : `No ${filter} notifications found. Try changing your filter.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="mt-12 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h3>
              <p className="text-gray-600">
                Customize how and when you receive notifications
              </p>
            </div>
            <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md">
              Manage Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;