import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({title, description , imag}) {
  return (
    <div className='header-container p-5 row justify-content-between align-items-center m-5 ' >
      <div className='caption text-white col-md-6 '>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="col-md-6  text-end">
        <img  className='header-img-1 img-fluid ' src={imag} alt="" />
        
      </div>
    </div>
  )
}
