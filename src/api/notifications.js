import { api } from "src/boot/axios";

export function getNotifications() {
  return api.get(`/collections/notifications/records`);
}

export function getNotification(id) {
  return api.get(`/collections/notifications/records/${id}`);
}

export function createNotification(obj) {
  return api.post(`/collections/notifications/records`, obj);
}

export function updateNotification(id, obj) {
  return api.patch(`/collections/notifications/records/${id}`, obj);
}

export function deleteNotification(id) {
  return api.delete(`/collections/notifications/records/${id}`);
}
