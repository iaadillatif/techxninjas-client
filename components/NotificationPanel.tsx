import React, { useEffect, useState } from 'react';
import { getNotifications, Notification } from '../services/notificationService';

interface NotificationPanelProps {
  userId: string;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ userId, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getNotifications(userId)
      .then((data) => setNotifications(data))
      .catch((err) => setError('Failed to load notifications.'))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="font-semibold">Notifications</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">&times;</button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
        {error && <div className="p-4 text-center text-red-500">{error}</div>}
        {!loading && !error && notifications.length === 0 && (
          <div className="p-4 text-center text-gray-500">No new notifications.</div>
        )}
        {!loading && !error && notifications.length > 0 && (
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id} className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(notif.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
