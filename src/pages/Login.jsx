/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'

function Login() {
	const [view, setView] = useState('login') // Tracks the current view: 'login', 'signup', 'forgot'

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
				{view === 'signup' ? (
					<form>
						{/* Sign Up Form */}
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
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
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
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1' htmlFor='phone'>
								Tel:
							</label>
							<input
								id='phone'
								type='tel'
								placeholder='+998'
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								defaultValue='+998'
								required
							/>
						</div>
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
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600'
						>
							Yuborish
						</button>
					</form>
				) : view === 'forgot' ? (
					<form>
						{/* Forgot Password Form */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1' htmlFor='phone'>
								Tel:
							</label>
							<input
								id='phone'
								type='tel'
								placeholder='+998'
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								defaultValue='+998'
								required
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600'
						>
							Kirish
						</button>
					</form>
				) : (
					<form>
						{/* Login Form */}
						<div className='mb-4'>
							<label className='block text-sm font-medium mb-1' htmlFor='phone'>
								Tel:
							</label>
							<input
								id='phone'
								type='tel'
								placeholder='+998'
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								defaultValue='+998'
								required
							/>
						</div>
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
								className='w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
								required
							/>
						</div>
						<button
							type='submit'
							className='w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600'
						>
							Kirish
						</button>
					</form>
				)}

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
