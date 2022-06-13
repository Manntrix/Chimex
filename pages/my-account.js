import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import updateUser from '@/functions/fetch/membersuite/updateUser'
import updatePassword from '@/functions/fetch/membersuite/updatePassword'
import DashboardLayout from '@/components/common/DashboardLayout'

export default function Page() {
  const { data: session } = useSession()

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [updateInfoSuccess, setUpdateInfoSuccess] = useState(false)
  const [updateInfoError, setUpdateInfoError] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword1, setNewPassword1] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false)
  const [updatePasswordError, setUpdatePasswordError] = useState(false)

  useEffect(() => {
    if (session) {
      setEmail(session.email)
      setFirstName(session.firstName)
      setLastName(session.lastName)
    }
  }, [session])

  async function handleUpdateUser(e) {
    e.preventDefault()

    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
    }

    const res = await updateUser(session.accessToken, session.userId, userData)

    if (res !== null) {
      setUpdateInfoSuccess(true)
      setUpdateInfoError(false)
    } else {
      setUpdateInfoSuccess(false)
      setUpdateInfoError(true)
    }
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()

    const passwordData = {
      userId: session.userId,
      oldPassword: currentPassword,
      newPassword: newPassword1,
    }

    const res = await updatePassword(session.accessToken, passwordData)

    if (res !== null) {
      setUpdatePasswordSuccess(true)
      setUpdatePasswordError(false)
    } else {
      setUpdatePasswordSuccess(false)
      setUpdatePasswordError(true)
    }
  }

  return (
    <DashboardLayout>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold text-blue-deep mb-8 uppercase'>
          Basic Information
        </h1>

        <div className='shadow rounded p-6 mb-8 bg-white'>
          <h3 className='text-xl font-semibold mb-4'>Account</h3>

          <form
            onSubmit={handleUpdateUser}
            className='grid md:grid-cols-3 gap-4'
          >
            <div>
              <label className='block text-gray-700 mb-1'>Email Address</label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address'
                className='rounded py-3 px-5 w-full text-gray-700 border-gray-400'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-1'>First Name</label>
              <input
                id='first-name'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
                className='rounded py-3 px-5 w-full text-gray-700 border-gray-400'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-1'>First Name</label>
              <input
                id='last-name'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Last Name'
                className='rounded py-3 px-5 w-full text-gray-700 border-gray-400'
              />
            </div>

            <input
              type='submit'
              value='Save'
              className='text-white bg-gradient-to-r from-blue-sky to-blue-turquoise p-3 cursor-pointer'
            />
          </form>

          {updateInfoSuccess && (
            <p className='text-blue-deep text-sm font-bold my-2'>
              Your information has been updated successfully
            </p>
          )}

          {updateInfoError && (
            <p className='text-red-700 text-sm font-bold my-2'>
              Something went wrong... Please try again later.
            </p>
          )}
        </div>

        <div className='shadow rounded p-6 mb-8 bg-white'>
          <h3 className='text-xl font-semibold mb-4'>Security</h3>

          <form
            onSubmit={handleUpdatePassword}
            className='grid md:grid-cols-3 gap-4'
          >
            <div>
              <label className='block text-gray-700 mb-1'>
                Your Current Password
              </label>
              <input
                type='password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='rounded py-3 px-5 w-full text-gray-700 border-gray-400'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-1'>New Password</label>
              <input
                type='password'
                value={newPassword1}
                onChange={(e) => setNewPassword1(e.target.value)}
                className='rounded py-3 px-5 w-full text-gray-700 border-gray-400'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-1'>
                Confirm New Password
              </label>
              <input
                type='password'
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                className='rounded py-3 px-5 w-full text-gray-700 border-gray-400'
              />
            </div>

            <input
              type='submit'
              value='Update my Password'
              className='text-white bg-gradient-to-r from-blue-sky to-blue-turquoise p-3 cursor-pointer'
            />
          </form>

          {updatePasswordSuccess && (
            <p className='text-blue-deep text-sm font-bold my-2'>
              Your password has been updated successfully
            </p>
          )}

          {updatePasswordError && (
            <p className='text-red-700 text-sm font-bold my-2'>
              Something went wrong... Please try again later.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
