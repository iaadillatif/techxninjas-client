// src/components/Notifications.tsx
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabaseClient'; // Corrected import path for your centralized client

// Define a TypeScript interface for Notification data
interface Notification {
    id: string;
    created_at: string;
    message_content: string;
    is_read: boolean;
    user_id: string | null; // user_id can now be null for public notifications
    is_public: boolean; // Add is_public to the interface
}

// --- Notifications Component ---
const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to handle initial session and auth state changes
        const handleAuth = async () => {
            setAuthLoading(true);
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error("Error getting session:", sessionError.message);
                setError(`Authentication error: ${sessionError.message}`);
                setAuthLoading(false);
                return;
            }

            setUser(session?.user || null);
            setAuthLoading(false);

            console.log("Auth State Changed. Current User:", session?.user); // DEBUG LOG
            if (session?.user) {
                fetchNotifications();
            } else {
                setNotifications([]); // Clear notifications if no user
                console.log("No user logged in, notifications cleared."); // DEBUG LOG
            }
        };

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log("onAuthStateChange event:", event, "session:", session); // DEBUG LOG
                setUser(session?.user || null);
                if (session?.user) {
                    fetchNotifications();
                } else {
                    setNotifications([]);
                }
            }
        );

        handleAuth(); // Call it once on mount to check initial session

        // Cleanup the listener when the component unmounts
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []); // Empty dependency array means this runs once on mount

    // Function to fetch notifications from Supabase
    const fetchNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Attempting to fetch notifications..."); // DEBUG LOG
            const { data, error: supabaseError } = await supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false });

            if (supabaseError) {
                console.error("Supabase fetch error:", supabaseError.message); // DEBUG LOG
                throw supabaseError;
            }

            console.log("Fetched notifications data:", data); // DEBUG LOG
            setNotifications(data || []);
        } catch (err: any) {
            console.error("Error fetching notifications:", err.message);
            setError(`Failed to load notifications: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Function to mark a notification as read
    const markAsRead = async (id: string) => {
        try {
            console.log(`Attempting to mark notification ${id} as read...`); // DEBUG LOG
            const { error: supabaseError } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', id);

            if (supabaseError) {
                console.error("Supabase update error:", supabaseError.message); // DEBUG LOG
                throw supabaseError;
            }

            console.log(`Notification ${id} marked as read successfully.`); // DEBUG LOG
            setNotifications(prevNotifications =>
                prevNotifications.map(notif =>
                    notif.id === id ? { ...notif, is_read: true } : notif
                )
            );
        } catch (err: any) {
            console.error("Error marking notification as read:", err.message);
            setError(`Failed to mark notification as read: ${err.message}`);
        }
    };

    // Tailwind CSS classes for consistent and responsive styling
    const notificationCardClasses = (isRead: boolean): string =>
        `p-4 mb-3 rounded-lg shadow-md transition-all duration-300 border ${
            isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200 shadow-lg' // Shaded effect for unread messages
        } flex flex-col sm:flex-row justify-between items-start sm:items-center`; // Responsive layout

    const buttonClasses: string = "mt-2 sm:mt-0 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200";
    const refreshButtonClasses: string = "px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-transform transform hover:scale-105";
    const loginPromptClasses: string = "bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg text-center text-xl font-semibold mt-8 shadow-md";
    const errorClasses: string = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 text-center text-gray-700">
                    Checking login status...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
                        Notifications
                    </h1>
                    <div className={loginPromptClasses}>
                        Please log in to view your notifications.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-200">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    Notifications
                </h1>

                {loading && (
                    <p className="text-center text-gray-600 text-lg">Loading notifications...</p>
                )}

                {error && (
                    <div className={errorClasses} role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline ml-2">{error}</span>
                    </div>
                )}

                {!loading && notifications.length === 0 && !error && (
                    <p className="text-center text-gray-600 text-lg">No notifications found.</p>
                )}

                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={notificationCardClasses(notif.is_read)}>
                            <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                                <p className="text-gray-800 text-base sm:text-lg leading-relaxed break-words">
                                    <span className="font-semibold">{notif.is_read ? 'Read:' : 'New:'}</span> {notif.message_content}
                                    {/* Display (Public) tag if it's a public notification */}
                                    {notif.is_public && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Public</span>}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Received: {new Date(notif.created_at).toLocaleString()}
                                </p>
                            </div>
                            {/* Only show "Mark as Read" button if it's an unread notification */}
                            {!notif.is_read && (
                                <button
                                    onClick={() => markAsRead(notif.id)}
                                    className={buttonClasses}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={fetchNotifications}
                        className={refreshButtonClasses}
                    >
                        Refresh Notifications
                    </button>
                    {/* Optional: Add a logout button for testing */}
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="ml-4 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
