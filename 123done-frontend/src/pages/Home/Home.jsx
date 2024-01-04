import { useAtom } from 'jotai/react'
import React from 'react'
import { userAtom } from '../../lib/jotai'

const Home = () => {
  const userData = useAtom(userAtom)

  return (
    <div className='flex flex-wrap'>
      asdasdasdasd
      
    </div>
  )
}

export default Home