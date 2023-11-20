import { create } from 'zustand';

export const useCartStore = create((set) => ({
	enterprise: null,
	dishes: [],
	menus: [],
	addDish: (dish) =>
		set((state) => {
			const isAlreadyInCart = state.dishes.some((d) => d._id === dish._id);
			const isFromOtherEnterprise =
				state.dishes.length > 0 && state.enterprise !== dish.enterpriseId;

			if (isAlreadyInCart || isFromOtherEnterprise) {
				return {
					dishes: state.dishes,
				};
			} else {
				return {
					enterprise: dish.enterpriseId,
					dishes: [...state.dishes, dish],
				};
			}
		}),
	addMenu: (menu) =>
		set((state) => {
			const isAlreadyInCart = state.menus.some((m) => m._id === menu._id);
			const isFromOtherEnterprise =
				state.menus.length > 0 && state.enterprise !== menu.enterpriseId;

			if (isAlreadyInCart || isFromOtherEnterprise) {
				return {
					menus: state.menus,
				};
			} else {
				return {
					enterprise: menu.enterpriseId,
					menus: [...state.menus, menu],
				};
			}
		}),
	removeDish: (id) =>
		set((state) => ({
			dishes: state.dishes.filter((d) => d._id !== id),
		})),
	removeMenu: (id) =>
		set((state) => ({ menus: state.menus.filter((m) => m._id !== id) })),
	editDish: (dish) =>
		set((state) => {
			const newDishes = state.dishes.map((d) =>
				d._id === dish._id ? { ...dish } : d
			);

			return {
				dishes: newDishes,
			};
		}),

	editMenu: (menu) =>
		set((state) => ({
			menus: state.menus.map((m) => (m._id === menu._id ? menu : m)),
		})),
}));
