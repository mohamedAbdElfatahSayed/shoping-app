import React from 'react'
import Profile from './ProfilePage'

const ProfilePage = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-black dark:to-gray-900 px-4">
  <div className="w-full  max-w-2xl bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6">
    <Profile id={id} />
  </div>
</div>
  )
}

export default ProfilePage