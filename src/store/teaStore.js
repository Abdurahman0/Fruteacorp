import { create } from 'zustand'

const useStore = create(set => ({
<<<<<<< HEAD
	
	isSidebarActive: true, 
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),

=======
	isSidebarActive: true, 
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),
>>>>>>> remotes/origin/rasuljon
	
	user: null,
	setUser: user => set({ user }),

	languagee: "uz",
	setLanguage: (i) => set({ languagee: i }),

}))

export default useStore
