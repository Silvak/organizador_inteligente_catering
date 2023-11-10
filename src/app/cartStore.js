import { create } from 'zustand';

export const useCartStore = create((set) => ({
	dishes: [],
	menus: [],
	addDish: (dish) =>
		set((state) => {
			const isAlreadyInCart = state.dishes.some((d) => d.id === dish.id);
			if (isAlreadyInCart) {
				return {
					dishes: state.dishes.map((d) => {
						if (d.id === dish.id) {
							return { ...d, quantity: d.quantity + 1 };
						}
						return d;
					}),
				};
			} else {
				return {
					dishes: [...state.dishes, { ...dish, quantity: 1 }],
				};
			}
		}),
	addMenu: (menu) =>
		set((state) => {
			const isAlreadyInCart = state.menus.some((m) => m.id === menu.id);
			if (isAlreadyInCart) {
				return {
					menus: state.menus.map((m) => {
						if (m.id === menu.id) {
							return { ...m, quantity: m.quantity + 1 };
						}
						return d;
					}),
				};
			} else {
				return {
					menus: [...state.menus, { ...menu, quantity: 1 }],
				};
			}
		}),
	removeDish: (dish) =>
		set((state) => ({ dishes: state.dishes.filter((d) => d.id !== dish.id) })),
	removeMenu: (menu) =>
		set((state) => ({ menus: state.menus.filter((m) => m.id !== menu.id) })),
}));
