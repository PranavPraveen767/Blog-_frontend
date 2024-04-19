import React from 'react'
import {  Puff } from 'react-loader-spinner'

function Loader() {
  return (
   <>
      <Puff
        height="100"
        width="100"
        radius="9"
        color="blue"
        ariaLabel="loading"
        
      />
   </>
  )
}

export default Loader