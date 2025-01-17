/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { CiTrash } from 'react-icons/ci'
import NoData from './img/not-product-Bbj56LVh.png'
import { Link } from 'react-router-dom'
import Nav from '../components/nav/Nav'
import NavTop from '../components/nav/NavTop'
function Cart() {
	const [cartItems, setCartItems] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchCart = async () => {
		try {
			const response = await fetch('https://api.fruteacorp.uz/cart', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
			})
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}
			const result = await response.json()
			setCartItems(result.data.items)
		} catch (error) {
			console.error('Error fetching cart:', error)
			alert('Savatchani yuklashda xatolik yuz berdi.')
		} finally {
			setLoading(false)
		}
	}

	const handleAddToCart = async productId => {
		try {
			const response = await fetch('https://api.fruteacorp.uz/cart/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({ productId, count: 1 }),
			})
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}
			const result = await response.json()
			if (result.data && result.data.items) {
				setCartItems(result.data.items)
			} else {
				fetchCart()
			}
		} catch (error) {
			console.error('Error adding product to cart:', error)
			alert("Mahsulotni savatchaga qo'shishda xatolik yuz berdi.")
		}
	}

	const handleRemoveAllFromCart = async productId => {
		try {
			const response = await fetch('https://api.fruteacorp.uz/cart/remove', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({ productId, count: 50 }), // count = 0 barcha mahsulotlarni o'chiradi
			})

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			fetchCart() // Savatni yangilash uchun qayta yuklanadi
		} catch (error) {
			console.error('Error removing all products from cart:', error)
			alert("Mahsulotni savatdan o'chirishda xatolik yuz berdi.")
		}
	}

	const handleRemoveFromCart = async productId => {
		try {
			const response = await fetch('https://api.fruteacorp.uz/cart/remove', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				body: JSON.stringify({ productId }),
			})
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}
			fetchCart()
		} catch (error) {
			console.error('Error removing product from cart:', error)
			alert('Mahsulotni savatchadan olib tashlashda xatolik yuz berdi.')
		}
	}

	useEffect(() => {
		fetchCart()
	}, [])

	const totalSum = cartItems.reduce((total, item) => {
		return total + item.Product.amount * item.quantity
	}, 0)

	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<>
			<Nav />
			<NavTop />
			<div className='container'>
				<h2 className='mt-16 text-[24px] font-semibold my-4'>
					Savatingiz,{' '}
					<span className='text-[#7E818C]'>{totalItems} mahsulot</span>
				</h2>

				{loading ? (
					<div className='flex items-center justify-center h-[80vh]'>
						<div className='w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin'></div>
					</div>
				) : cartItems.length > 0 ? (
					<div className='flex w-full justify-between flex-wrap gap-5 md:flex-nowrap md:gap-0 '>
						<div className='w-full border border-green-300 rounded-md p-5'>
							<ul className='space-y-4'>
								<p className='text-right text-[#7E818C] text-xs'>
									Mahsulot 24 soat ichida yetkazib beriladi
								</p>
								{cartItems.map(item => {
									const product = item.Product
									const imageUrl = product?.images?.[0]?.image?.name
										? `https://api.fruteacorp.uz/images/${product.images[0].image.name}`
										: 'https://via.placeholder.com/150'

									const total = product.amount * item.quantity

									return (
										<li
											key={item.id}
											className=' relative flex items-center justify-between p-4 border-t border-green-300'
										>
											<div className=' relative flex gap-5'>
												<img
													src={imageUrl}
													alt={product?.title_uz || 'No title'}
													className='w-full max-h-[140px] block object-contain max-w-[100px] mb-2 rounded sm:max-h-[350px]'
												/>
												<div className='md:hidden absolute bottom-[-35px] border border-green-300 flex items-center justify-between rounded-md m-2 p-2 h-[35px] w-[90px] md:w-[120px]'>
													<button
														onClick={() => handleAddToCart(item.productId)}
														className='md:text-[18px]'
													>
														+
													</button>
													<span className='text-[18px]'>{item.quantity}</span>
													<button
														onClick={() => handleRemoveFromCart(item.productId)}
														className='text-[18px]'
													>
														-
													</button>
												</div>
												<div className='flex flex-col justify-between pb-2 '>
													<h3 className='text-[12px]   sm:text-[18px] font-medium'>
														{product.title_uz}
													</h3>
													<div className='border border-green-300 flex items-center justify-between rounded-md m-2 p-2 w-[90px] md:w-[120px] max-[768px]:hidden'>
														<button
															onClick={() => handleAddToCart(item.productId)}
															className='md:text-[18px]'
														>
															+
														</button>
														<span className='text-[18px]'>{item.quantity}</span>
														<button
															onClick={() =>
																handleRemoveFromCart(item.productId)
															}
															className='text-[18px]'
														>
															-
														</button>
													</div>
												</div>
											</div>

											<div className='flex flex-col justify-between h-40 max-[768px]:justify-end  max-[768px]:absolute  right-[-15px] '>
												<button
													onClick={() =>
														handleRemoveAllFromCart(item.productId)
													}
													className='text-[black] px-3 py-1 rounded flex items-center gap-2 hover:text-red-600'
												>
													<CiTrash className='text-xl' />{' '}
													<p className='text-xs'>yo'q qilish</p>
												</button>
												<p className='text-[14px]  md:text-[24px]  text-black'>
													{total} so'm
												</p>
											</div>
										</li>
									)
								})}
							</ul>
						</div>
						<div className='flex flex-col justify-around w-[460px] max-h-[270px] border border-green-300 rounded-md p-5 ml-5'>
							<p>Buyurtmangiz</p>
							<div className='flex justify-between'>
								<h4 className='flex gap-1'>
									Mahsulotlar:<span>({totalItems})</span>:
								</h4>
								<h4 className='flex text-[#1F2026]'>{totalSum} so'm</h4>
							</div>
							<div className='border border-green-400 p-1'>
								<p className='flex text-xs justify-center items-center text-[#159946]'>
									Yetkazib berish 24 soat ichida
								</p>
							</div>
							<div className='flex justify-between'>
								<h4 className='flex gap-1'>
									Jami: <span>({totalItems})</span>:
								</h4>
								<h4 className='flex text-xl text-black'>{totalSum} so'm</h4>
							</div>
							<button className='w-full text-white bg-[#16A24A] rounded-md p-2'>
								Rasmiylashtirishga o'tish
							</button>
						</div>
					</div>
				) : (
					<div className=' text-center mx-auto mt-12'>
						<img
							className=' text-center mx-auto'
							src={NoData}
							width={300}
							alt=''
						/>
						<div className='flex flex-col gap-3'>
							<h2 className=' text-2xl font-medium'>
								Savatda hozircha mahsulot yo'q
							</h2>
							<p className=' text-sm'>
								Bosh sahifadagi to'plamlardan boshlang yoki kerakli mahsulotni
								qidiruv orqali toping
							</p>
							<Link to={'/'}>
								<button className=' w-28 h-9 bg-[#16A34A] text-white rounded-md'>
									Bosh sahifa
								</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Cart
