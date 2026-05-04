import React from 'react'
import { Loader } from './ui/loader'

const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Loader  variant="magnetic-dots"  >
        <span className='text-white text-lg font-bold'>Loading...</span>
      </Loader>
    </div>
  )
}

export default Loading