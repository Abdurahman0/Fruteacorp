import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Faq from './pages/Faq'
import Products from './pages/Products'
import Main from './pages/Main'

import Wishes from './pages/Wishes'
import Login from './components/Login'
// import { useEffect, useState } from 'react'

// function ProtectedRoute({ children }) {
// 	const token = localStorage.getItem('accessToken')
// 	return token ? children : <Navigate to='/login' />
// }

import { MainLayout } from './layout/main-layout'
import { TeaCard } from './layout/tea-card'

function App() {
	// const navigate = useNavigate()
	// const [token, setToken] = useState(localStorage.getItem('accessToken'))

	// // Sync state with localStorage changes
	// const syncTokenWithLocalStorage = () => {
	// 	const updatedToken = localStorage.getItem('accessToken')
	// 	setToken(updatedToken)
	// }

	// // Handle token addition/removal in localStorage (cross-tab support)
	// useEffect(() => {
	// 	window.addEventListener('storage', syncTokenWithLocalStorage)
	// 	return () => {
	// 		window.removeEventListener('storage', syncTokenWithLocalStorage)
	// 	}
	// }, [])

	// // Navigate on token changes
	// useEffect(() => {
	// 	if (!token) {
	// 		navigate('/login')
	// 	}
	// }, [token, navigate])

	return (
		<div>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/about' element={<About />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/faq' element={<Faq />} />
				<Route path='/products' element={<Products />} />
				<Route path='/about' element={<About />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/faq' element={<Faq />} />
				<Route path='/wishes' element={<Wishes />} />
				<Route path='products/:id' element={<MainLayout />}>
					<Route index element={<Products />} />
					<Route path='choy' element={<TeaCard />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
