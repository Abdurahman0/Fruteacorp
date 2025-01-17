import { create } from 'zustand'

const useStore = create(set => ({
	isSidebarActive: true,
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),

	user: null,
	setUser: user => set({ user }),

	languagee: 'uz',
	setLanguage: i => set({ languagee: i }),
}))

export default useStore
