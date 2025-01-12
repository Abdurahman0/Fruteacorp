/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { toast } from 'react-toastify'

function Login() {
	const [view, setView] = useState('login') // Tracks the current view: 'login', 'signup', 'forgot'
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '+998',
		password: '',
	})

	// Handles input changes
	const handleChange = e => {
		const { id, value } = e.target
		setFormData(prev => ({
			...prev,
			[id]: value,
		}))
	}

	// Handles form submissions
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const endpoint =
				view === 'signup'
					? 'https://api.fruteacorp.uz/auth/signup'
					: view === 'forgot'
					? 'https://api.fruteacorp.uz/auth/send-sms'
					: 'https://api.fruteacorp.uz/auth/signin'

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			const result = await response.json()
			if (response.ok) {
				// Assuming the token is returned in result.token or result.data.token
				const AccessToken = result.data.accessToken.token
				const RefreshToken = result.data.refreshToken.token
				if (AccessToken && RefreshToken) {
					// Save the token to localStorage or sessionStorage
					localStorage.setItem('accessToken', AccessToken) // or sessionStorage.setItem('authToken', token)
					localStorage.setItem('refreshToken', RefreshToken) // or sessionStorage.setItem('authToken', token)
					toast('Request successful!')
				} else {
					toast('No token received')
				}
			} else {
				toast(`Error: ${result.message}`)
			}
		} catch (error) {
			console.error('Error:', error)
			toast('Something went wrong!')
		}
	}

	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='bg-white w-96 p-6 border rounded-md shadow-md'>
				{/* Header */}
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-2xl font-bold'>
						{view === 'signup'
							? "Ro'yxatdan o'tish"
							: view === 'forgot'
							? 'Parolni tiklash'
							: 'Kirish'}
					</h2>
					<button
						className='text-lg font-semibold bg-gray-200 p-2 rounded-full hover:bg-gray-300'
						onClick={() => setView('login')} // Close and return to login
					>
						x
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit}>
					{view === 'signup' && (
						<>
							{/* First Name */}
							<div className='mb-4'>
								<label
									className='block text-sm font-medium mb-1'
									htmlFor='firstName'
								>
									Ismingizni kiriting:
								</label>
								<input
									id='firstName'
									type='text'
									placeholder='Ism'
									value={formData.firstName}
									onChange={handleChange}
									className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>
							{/* Last Name */}
							<div className='mb-4'>
								<label
									className='block text-sm font-medium mb-1'
									htmlFor='lastName'
								>
									Familiyangizni kiriting:
								</label>
								<input
									id='lastName'
									type='text'
									placeholder='Familiya'
									value={formData.lastName}
									onChange={handleChange}
									className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>
						</>
					)}

					{/* Phone */}
					<div className='mb-4'>
						<label className='block text-sm font-medium mb-1' htmlFor='phone'>
							Tel:
						</label>
						<input
							id='phone'
							type='tel'
							placeholder='+998'
							value={formData.phone}
							onChange={handleChange}
							className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
					</div>

					{/* Password */}
					{view !== 'forgot' && (
						<div className='mb-6'>
							<label
								className='block text-sm font-medium mb-1'
								htmlFor='password'
							>
								Parolni kiriting:
							</label>
							<input
								id='password'
								type='password'
								placeholder='Parol'
								value={formData.password}
								onChange={handleChange}
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
					)}

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600'
					>
						{view === 'signup'
							? 'Yuborish'
							: view === 'forgot'
							? 'Tiklash'
							: 'Kirish'}
					</button>
				</form>

				{/* Footer Links */}
				<div className='mt-4 text-center'>
					{view === 'login' && (
						<>
							<a
								href='#'
								onClick={() => setView('signup')}
								className='text-blue-500 hover:underline text-sm block'
							>
								Ro'yxatdan o'tish →
							</a>
							<a
								href='#'
								onClick={() => setView('forgot')}
								className='text-blue-500 hover:underline text-sm block'
							>
								Parolni unutdingizmi? →
							</a>
						</>
					)}
					{view !== 'login' && (
						<a
							href='#'
							onClick={() => setView('login')}
							className='text-blue-500 hover:underline text-sm block'
						>
							Kirish →
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

export default Login