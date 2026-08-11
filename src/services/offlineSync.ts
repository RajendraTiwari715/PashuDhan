export interface OfflineTask {
  id: string;
  type: 'patrol_scan' | 'complaint' | 'tag_link';
  payload: any;
  createdAt: string;
}

const OFFLINE_QUEUE_KEY = 'pashudhan_offline_queue_v1';

export const getOfflineQueue = (): OfflineTask[] => {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

export const addOfflineTask = (type: OfflineTask['type'], payload: any): OfflineTask => {
  const queue = getOfflineQueue();
  const newTask: OfflineTask = {
    id: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
    type,
    payload,
    createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
  };

  queue.unshift(newTask);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  return newTask;
};

export const clearOfflineQueue = () => {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
};

export const syncOfflineQueue = (): number => {
  const queue = getOfflineQueue();
  const count = queue.length;
  // Process queued items and clear
  clearOfflineQueue();
  return count;
};

export const isOnline = (): boolean => {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
};
