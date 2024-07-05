import React from 'react'
import Header from './Header'
import { useStateContext } from '../contexts/ContextProvider'

const SizeDescription = () => {
    const { erpData } = useStateContext();

  return (
    <div className='mt-10'>
        <Header title="SIZE DESCRIPTION" />
        {erpData.map((data) => (
                <div className="">
                   <h1>{JSON.stringify(data)}</h1>
                </div>
            ))}
    </div>
  )
}

export default SizeDescription