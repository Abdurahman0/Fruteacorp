import { create } from 'zustand'

const useStore = create(set => ({
	
	isSidebarActive: true, 
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),

	
	user: null,
	setUser: user => set({ user }),
}))

export default useStore
