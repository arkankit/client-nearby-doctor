import React from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
    //Link tag does not refresh page like <a> tag
  return (
    <div className="errorPage">
        <p>404 not found</p>
        <Link to= "/">Go back to Home</Link>
    </div>
  )
}

export default NotFoundPage