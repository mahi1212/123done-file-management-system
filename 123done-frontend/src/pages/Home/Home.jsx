import { useAtom } from 'jotai/react'
import React from 'react'
import { userAtom } from '../../lib/jotai'

const Home = () => {
  const userData = useAtom(userAtom)

  return (
    <div className='flex w-full h-full'>
      Home + {JSON.stringify(userData)}
    </div>
  )
}

export default Home