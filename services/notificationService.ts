import { supabase } from '../lib/supabaseClient';
import { Notification, NotificationType } from '../types';

/**
 * Service for managing user notifications
 */

/**
 * Get all notifications for a user
 */
export const getUserNotifications = async (
  userId: string,
  limit: number = 50
): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (userId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }
};

/**
 * Mark notification as read
 */
export const markAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};

/**
 * Create a notification
 */
export const createNotification = async (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  link?: string,
  data?: any
): Promise<boolean> => {
  try {
    const { error } = await supabase.from('notifications').insert([
      {
        user_id: userId,
        type,
        title,
        message,
        link,
        data,
        read: false,
      },
    ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};

/**
 * Subscribe to real-time notifications
 */
export const subscribeToNotifications = (
  userId: string,
  callback: (notification: Notification) => void
) => {
  const channel = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Create event reminder notification
 */
export const createEventReminder = async (
  userId: string,
  eventId: string,
  eventTitle: string,
  reminderTime: 'now' | '1hour' | '24hours'
): Promise<boolean> => {
  const messages = {
    now: `The event "${eventTitle}" is starting now!`,
    '1hour': `Reminder: "${eventTitle}" starts in 1 hour!`,
    '24hours': `Reminder: "${eventTitle}" starts tomorrow!`,
  };

  return await createNotification(
    userId,
    NotificationType.EVENT_REMINDER,
    'Event Reminder',
    messages[reminderTime],
    `/events/${eventId}`,
    { event_id: eventId }
  );
};

/**
 * Create course update notification
 */
export const createCourseUpdateNotification = async (
  userId: string,
  courseId: string,
  courseTitle: string,
  updateType: 'new_video' | 'content_update'
): Promise<boolean> => {
  const messages = {
    new_video: `New video added to "${courseTitle}"!`,
    content_update: `"${courseTitle}" has been updated with new content!`,
  };

  return await createNotification(
    userId,
    NotificationType.COURSE_UPDATE,
    'Course Update',
    messages[updateType],
    `/courses/${courseId}`,
    { course_id: courseId }
  );
};

/**
 * Create comment reply notification
 */
export const createCommentReplyNotification = async (
  userId: string,
  articleId: string,
  articleTitle: string,
  replierName: string
): Promise<boolean> => {
  return await createNotification(
    userId,
    NotificationType.COMMENT_REPLY,
    'New Reply',
    `${replierName} replied to your comment on "${articleTitle}"`,
    `/articles/${articleId}`,
    { article_id: articleId, replier_name: replierName }
  );
};

/**
 * Create follow notification
 */
export const createFollowNotification = async (
  userId: string,
  followerName: string,
  followerId: string
): Promise<boolean> => {
  return await createNotification(
    userId,
    NotificationType.FOLLOW,
    'New Follower',
    `${followerName} started following you!`,
    `/profile/${followerId}`,
    { follower_id: followerId }
  );
};

/**
 * Create message notification
 */
export const createMessageNotification = async (
  userId: string,
  senderName: string,
  senderId: string,
  messagePreview: string
): Promise<boolean> => {
  return await createNotification(
    userId,
    NotificationType.MESSAGE,
    'New Message',
    `${senderName}: ${messagePreview}`,
    `/messages`,
    { sender_id: senderId }
  );
};
