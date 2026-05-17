import React from 'react'
import UpdateProduct from './UpdateProduct'

const page =async ({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params
  return (
    <div><UpdateProduct id={id}/></div>
  )
}

export default page