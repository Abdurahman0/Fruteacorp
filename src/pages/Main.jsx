import Login from '../components/Login'

function Main() {
	const accessToken = localStorage.getItem('accessToken')

	return (
		<div>
			Main
			<div className={accessToken && 'hidden'}>
				<Login />
			</div>
		</div>
	)
}

export default Main
