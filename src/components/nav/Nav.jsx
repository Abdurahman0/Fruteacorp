import useStore from '../../store/teaStore'

function Nav() {
	const { setLanguage } = useStore()
	const languages = [
		{ code: 'uz', flag: '🇺🇿' },
		{ code: 'ru', flag: '🇷🇺' },
		{ code: 'en', flag: '🇬🇧' },
	]
	const flags = i => {
		setLanguage(i)
	}
	// console.log(languagee);

	return (
		<div>
			<div className='hidden lg:flex bg-green-200 w-full justify-center text-[14px] font-medium text-custom-gray-800'>
				<div className='border-r border-[#fff] pr-[10px] py-[10px]'>
					<a
						href='/products'
						className='hover:underline cursor-pointer font-semibold'
					>
						hozir sotib olish
					</a>
				</div>
				<a href='/faq' className='py-[10px] px-[10px] border-r border-[#fff]'>
					savol-javob
				</a>
				<div className='flex gap-[10px] py-[10px] pl-[10px]'>
					{languages.map(lang => (
						<span
							key={lang.code}
							className='w-7 h-6 flex justify-center cursor-pointer'
							onClick={() => flags(lang.code)}
						>
							{lang.flag}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default Nav
