import React from 'react'
import logo from '../assets/logo.svg'

function Header() {
  return (
    <div className='header'>
      <div className='header-content'>
        <img src={logo} alt="logo groupama" />
        <h1 className='header-title' >Assistant de Déclaration de Sinistre</h1>
      </div>
    </div>
  )
}

export default Header