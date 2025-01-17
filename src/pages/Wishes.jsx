/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useCallback } from 'react'
import { BsBagPlus } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { GiSelfLove } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import NoData from './img/not-product-Bbj56LVh.png'
import NavTop from '../components/nav/NavTop'
import Nav from '../components/nav/Nav'
import All from '../components/products/All'
const Wishes = () => {
	const [wishes, setWishes] = useState([])
	const [popularProducts, setPopularProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [likedProducts, setLikedProducts] = useState([])
	const token = localStorage.getItem('accessToken')

	const fetchWishlist = useCallback(async () => {
		if (!token) {
			setError('Please log in to view your wishlist.')
			setLoading(false)
			return
		}

		try {
			const response = await fetch('https://api.fruteacorp.uz/wishlist', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				throw new Error(`Error ${response.status}: Failed to fetch wishlist.`)
			}

			const data = await response.json()
			const products = data.data?.[0]?.products || []
			const uniqueProducts = products.reduce((acc, current) => {
				if (!acc.find(item => item.id === current.id)) {
					acc.push(current)
				}
				return acc
			}, [])

			setWishes(uniqueProducts.map(wish => ({ ...wish, liked: true })))
			setError(null)
		} catch (err) {
			setError(err.message || 'Failed to fetch wishlist. Please try again.')
		} finally {
			setLoading(false)
		}
	}, [token])

	const fetchPopularProducts = useCallback(async () => {
		try {
			const response = await fetch('https://api.fruteacorp.uz/products', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error(
					`Error ${response.status}: Failed to fetch popular products.`
				)
			}

			const data = await response.json()
			setPopularProducts(data.data || [])
		} catch (err) {
			setError(err.message || 'Failed to fetch popular products.')
			setPopularProducts([])
		}
	}, [])

	useEffect(() => {
		fetchWishlist()
		fetchPopularProducts()
	}, [fetchWishlist, fetchPopularProducts])

	const handleClick = async (id, type) => {
		if (type === 'love') {
			console.log('Love ID:', id)

			if (!token) {
				console.error('Token not found. Please log in.')
				return
			}

			try {
				const response = await fetch('https://api.fruteacorp.uz/wishlist', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						productId: id,
					}),
				})

				if (!response.ok) {
					throw new Error('Failed to add/remove product from wishlist')
				}

				// Re-fetch the wishlist after liking/unliking a product
				await fetchWishlist()

				console.log('Successfully updated wishlist')
			} catch (error) {
				console.error('Error:', error)
			}
		}
	}

	const addToCart = async productId => {
		if (!token) {
			console.error('Token not found. Please log in.')
			return
		}

		try {
			const response = await fetch('https://api.fruteacorp.uz/cart/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ productId, count: 1 }),
			})

			if (!response.ok) {
				const errorData = await response.json()
				console.error(`Error: ${errorData.message}`)
				return
			}

			console.log('Product successfully added to cart.')
		} catch (error) {
			console.error('Error adding product to cart:', error)
		}
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center h-[80vh]'>
				<div className='w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin'></div>
			</div>
		)
	}

	if (error) return <p className='text-red-500'>{error}</p>

	return (
		<>
			<Nav />
			<NavTop />

			<div className='container mx-auto p-4'>
				<h2 className='text-3xl border-b-[1px] pb-4 mt-12 mb-5 font-normal w-[100%]'>
					Istaklarim
				</h2>
				{wishes.length === 0 ? (
					<div className='text-center mx-auto mt-12'>
						<img
							className='text-center mx-auto'
							src={NoData}
							width={300}
							alt=''
						/>
						<div className='flex flex-col gap-3'>
							<h2 className='text-2xl font-medium'>
								Savatda hozircha mahsulot yo'q
							</h2>
							<p className='text-sm'>
								Bosh sahifadagi to'plamlardan boshlang yoki kerakli mahsulotni
								qidiruv orqali toping
							</p>
							<Link to={'/'}>
								<button className='w-28 h-9 bg-[#16A34A] text-white rounded-md'>
									Bosh sahifa
								</button>
							</Link>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-x-3 gap-y-10 mb-5 sm:gap-x-5'>
						{wishes.map(wish => {
							const product = wish.Product
							const imageUrl = product?.images?.[0]?.image?.name
								? `https://api.fruteacorp.uz/images/${product.images[0].image.name}`
								: 'https://via.placeholder.com/150'

							return (
								<div
									key={wish.id}
									className='max-w-[400px] relative border border-green-300 hover:shadow-[0px_0px_13px_rgba(72,239,128,0.5)] overflow-hidden rounded-[20px] flex flex-col pb-4'
								>
									<div className='relative bg-[#EFEFEF]'>
										<img
											src={imageUrl}
											alt={product?.title_uz || 'No title'}
											className='w-full max-h-[200px] block object-contain rounded mb-2 sm:max-h-[350px]'
										/>
										<button
											className='absolute right-1 text-xl sm:text-2xl sm:right-3 top-4 text-[red]'
											onClick={() => handleClick(product.id, 'love')}
										>
											<GiSelfLove
												style={{ color: wish.liked ? 'red' : 'gray' }}
											/>
										</button>
									</div>
									<div className='p-3'>
										<h3 className='text-[#1F2026] text-[10px] sm:text-[12.8px] h-16 font-semibold mb-1 text-left'>
											{product?.title_uz || "Mahsulot nomi yo'q"}
											<div className='flex items-center gap-1 mt-1'>
												<FaStar style={{ color: '#FFB54C' }} />
												<h4 className='text-[#7E818C]'>5 (0 sharhlar)</h4>
											</div>
										</h3>
										<div className='flex items-center gap-3 justify-between'>
											<p className='text-[#1F2026] text-[10px] sm:text-[15px]'>
												Narxi: {product?.amount || 0} so'm
											</p>
											<button
												className='px-3 py-3 rounded-[50px] border'
												onClick={() => addToCart(product?.id)}
											>
												<BsBagPlus />
											</button>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				)}

				<h1 className='text-3xl mt-12 mb-8'>Mashhur</h1>

				{popularProducts.length > 0 ? (
					<All
						data={popularProducts}
						fetchWishlist={fetchWishlist}
						getLocalizedTitle={product => product?.title_uz || 'No Title'}
					/>
				) : (
					<p className='text-gray-500'>Hozircha mashhur mahsulotlar yo'q.</p>
				)}
			</div>
		</>
	)
}

export default Wishes
