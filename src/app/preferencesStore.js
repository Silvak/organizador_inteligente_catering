import { create } from 'zustand';

export const usePreferencesStore = create((set) => ({
	dish: null,
	menu: null,
	setDish: (dish) => set({ dish: dish }),
	setMenu: (menu) => set({ menu: menu }),
	clear: () => set({ dish: null, menu: null }),
}));
