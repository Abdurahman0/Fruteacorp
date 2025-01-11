import { create } from 'zustand'

const useStore = create(set => ({
	// Sidebar state
	isSidebarActive: true, // Default value
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),

	// Example: Other global states
	user: null,
	setUser: user => set({ user }),
}))

export default useStore
