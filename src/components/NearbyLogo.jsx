import React from 'react'
import brandLogo from './../assets/nearby-brand-logo.png'


function NearbyLogo({wth, mb}) {
  return (
    <img style={{width: wth, marginBottom: mb}} src={brandLogo} alt='nearby brand logo'/>
  )
}

export default NearbyLogo