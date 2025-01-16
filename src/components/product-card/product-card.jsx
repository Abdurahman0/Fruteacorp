import React from 'react'
import { GiSelfLove } from 'react-icons/gi'

export const ProductCard = ({images, amount, title_uz}) => {
  console.log(images[0].image.name)
  return (
    <div className=' relative w-[300px] h-[400px] bg-gray-200 rounded-3xl p-5 '>
      <span className=' absolute right-10'>
        <GiSelfLove/>
      </span>
        <img className='w-[200px] h-[300px]' src={`https://api.fruteacorp.uz/images/${images[0].image.name}`} alt="img" />
        <h1>{title_uz}</h1>
        <span>{amount}</span>
    </div>
  )
}
