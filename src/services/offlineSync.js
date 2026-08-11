






const OFFLINE_QUEUE_KEY = 'pashudhan_offline_queue_v1';

export const getOfflineQueue = () => {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

export const addOfflineTask = (type, payload) => {
  const queue = getOfflineQueue();
  const newTask = {
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

export const syncOfflineQueue = () => {
  const queue = getOfflineQueue();
  const count = queue.length;
  // Process queued items and clear
  clearOfflineQueue();
  return count;
};

export const isOnline = () => {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
};