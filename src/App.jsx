import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Faq from './pages/Faq'
import Products from './pages/Products'
import Wishes from './pages/wishes'

function App() {
	return (
		<div>
			<ToastContainer />
			<Login />
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/about' element={<About />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/faq' element={<Faq />} />
				<Route path='/products' element={<Products />} />
				<Route path='/wishes' element={<Wishes />} />
			</Routes>
		</div>
	)
}

export default App
