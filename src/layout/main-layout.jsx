import { Link, Outlet } from 'react-router'

export const MainLayout = () => {
	return (
		<div className='flex justify-center '>
			<div className='mt-20 ml-5 text-xl font-medium'>
				<Link to={'/product'}>Choy</Link>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
