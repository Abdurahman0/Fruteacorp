import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Cart from './pages/Cart'
import Faq from './pages/Faq'
import Products from './pages/Products'
import Wishes from './pages/wishes'
import Main from './pages/Main'
import { MainLayout } from './layout/main-layout'
import { TeaCard } from './layout/tea-card'

function App() {
	return (
		<div>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Main />} />
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
