import React from 'react'
import Header from '../../../shared/Components/Header/Header'
import headerImg from './../../../../assets/images/UsersListHeaderImg.png'
export default function UsersList() {
  return (
    <div><Header
    title={"Users List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    imag={headerImg}
    /></div>
  )
}
