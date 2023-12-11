import React from 'react'

const CardWrapper = ({className, children}) => {
  return (
    <div className={`${className} bg-white  `} style={{
        boxShadow: "0px 3.09579px 12.3831px rgba(17, 34, 17, 0.05)",
        borderRadius:" 9.28736px"}}>{children}</div>
  )
}

export default CardWrapper