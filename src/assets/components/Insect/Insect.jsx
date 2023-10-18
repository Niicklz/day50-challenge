import React from 'react'
import "./Insect.css"

export const Insect = ({name, urlImg, select}) => {
  return (
    <div className='insect' onClick={()=> select(urlImg)}>
        <h3 className="insect-name">{name}</h3>
        <figure className='insect-image'><img src={urlImg} alt="" /></figure>

    </div>
  )
}
