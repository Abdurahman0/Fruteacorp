import { create } from 'zustand'

const useStore = create(set => ({
	// Sidebar state
	isSidebarActive: true,
	toggleSidebar: () =>
		set(state => ({ isSidebarActive: !state.isSidebarActive })),

	// Form data state
	formData: JSON.parse(localStorage.getItem('formData')) || {
		firstName: '',
		lastName: '',
		phone: '+998',
		password: '',
	},
	setFormData: newFormData => {
		set({ formData: newFormData })
		localStorage.setItem('formData', JSON.stringify(newFormData))
	},

	// User state
	user: JSON.parse(localStorage.getItem('user')) || null,
	setUser: newUser => {
		set({ user: newUser })
		localStorage.setItem('user', JSON.stringify(newUser))
	},

	// Language state
	language: 'uz',
	setLanguage: lang => set({ language: lang }),
}))

export default useStore
