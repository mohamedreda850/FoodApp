import React from 'react'

export default function Header({title, description , imag}) {
  return (
    <div className='header-container p-5 d-flex justify-content-between align-items-center m-5' >
      <div className='caption text-white w-50'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="header-img">
        <img src={imag} alt="" />
      </div>
    </div>
  )
}
