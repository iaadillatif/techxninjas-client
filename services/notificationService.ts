import { supabase } from '../lib/supabaseClient';

export interface Notification {
  id: string;
  message: string;
  created_at: string;
  read: boolean;
}

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
  return data as Notification[];
};
getNotifications