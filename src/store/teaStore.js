import { create } from 'zustand'

const useStore = create(set => ({
	isSidebarActive: true,
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),

	user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage
	setUser: user => {
		set({ user })
		localStorage.setItem('user', JSON.stringify(user)) // Save user to localStorage
	},

	languagee: 'uz',
	setLanguage: i => set({ languagee: i }),
}))

export default useStore
