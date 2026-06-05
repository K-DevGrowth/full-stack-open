import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setNotification: (content) => {
      set(() => ({ notification: content }));
      setTimeout(() => set(() => ({ notification: "" })), 5000);
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const setNotification = (content) =>
  useNotificationStore.getState().actions.setNotification(content);
