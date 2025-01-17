/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { BsBagPlus } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { GiSelfLove } from 'react-icons/gi'
import React, { useState, useEffect } from 'react'

const All = React.memo(({ data, getLocalizedTitle, fetchWishlist }) => {
	const [loading, setLoading] = useState(false)
	const [likedProducts, setLikedProducts] = useState([]) // Liked product IDs

	useEffect(() => {
		// Wishlistni qayta yuklash
		fetchWishlist
	}, [likedProducts, fetchWishlist])

	const handleClick = async (id, type) => {
		if (type === 'love') {
			console.log('Love ID:', id)

			const token = localStorage.getItem('accessToken')

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
					throw new Error('Failed to add to wishlist')
				}

				// Yurak tugmasining rangini yangilash
				setLikedProducts(
					prevLiked =>
						prevLiked.includes(id)
							? prevLiked.filter(likedId => likedId !== id) // O'chirish
							: [...prevLiked, id] // Qo'shish
				)

				console.log('Successfully added to wishlist')
			} catch (error) {
				console.error('Error:', error)
			}
		}
	}

	const addToCart = async productId => {
		setLoading(true)
		const token = localStorage.getItem('accessToken')
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
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-x-3 gap-y-10 mb-5 sm:gap-x-5'>
			{data?.data?.map(product => {
				const imageUrl = product?.images?.[0]?.image?.name
					? `https://api.fruteacorp.uz/images/${product.images[0].image.name}`
					: 'https://via.placeholder.com/150'

				const isLiked = likedProducts.includes(product.id)

				return (
					<div
						key={product.id}
						className='max-w-[400px] relative border border-green-300 hover:shadow-[0px_0px_13px_rgba(72,239,128,0.5)] overflow-hidden rounded-[20px] flex flex-col pb-4'
					>
						<div className='relative bg-[#EFEFEF]'>
							<img
								src={imageUrl}
								alt={getLocalizedTitle(product)}
								className='w-full max-h-[200px] block object-contain rounded mb-2 sm:max-h-[350px]'
							/>
							<button
								className='absolute right-1 text-xl sm:text-2xl sm:right-3 top-4'
								onClick={() => handleClick(product.id, 'love')}
							>
								<GiSelfLove style={{ color: isLiked ? 'red' : 'gray' }} />
							</button>
						</div>
						<div className='p-3'>
							<h3 className='text-[#1F2026] text-[10px] sm:text-[12.8px] h-16 font-semibold mb-1 text-left'>
								{getLocalizedTitle(product)}
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
									onClick={() => addToCart(product.id)}
								>
									<BsBagPlus />
								</button>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
})

export default All
