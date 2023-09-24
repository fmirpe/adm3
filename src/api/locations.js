import { api } from "src/boot/axios";

export function getLocations() {
  return api.get(`/collections/locations/records`);
}

export function getLocation(id) {
  return api.get(`/collections/locations/records/${id}`);
}

export function createLocation(obj) {
  return api.post(`/collections/locations/records`, obj);
}

export function updateLocation(id, obj) {
  return api.patch(`/collections/locations/records/${id}`, obj);
}

export function deleteLocation(id) {
  return api.delete(`/collections/locations/records/${id}`);
}
