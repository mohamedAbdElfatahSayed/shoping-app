import React from 'react'
import ProductPage from './ProductPage'

const page =async ({params}:{params:Promise<{id:string}>}) => {
      const {id}=await params
  return (
    <div><ProductPage id={id }/></div>
  )
}

export default page