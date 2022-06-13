import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { XIcon } from '@heroicons/react/solid'
import Image from '@/components/atoms/Image'
import { useRouter } from 'next/router'

export default function SigninForm({ setShowSignin }) {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e && e.preventDefault()

    const signin = await signIn('un-pw-login', {
      redirect: false,
      username,
      password,
    })

    if (signin?.error) {
      setError('Invalid username or password.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className='px-6 py-8 bg-white rounded-lg shadow-lg relative'>
      <Image
        src={`/images/logo-black.svg`}
        width={264}
        height={47}
        alt='CHIME'
      />

      <h3 className='text-black text-xl font-bold mt-6 mb-2'>Sign In</h3>

      <form
        className='mt-4 mb-4 flex flex-col items-start gap-4 rounded'
        onSubmit={handleLogin}
      >
        <input
          className='border rounded-xl w-full py-4 px-4 text-base placeholder:text-sm bg-white focus:bg-gray-100'
          id='username'
          name='username'
          type='email'
          placeholder='Your Email'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className='border rounded-xl w-full py-4 px-4 text-base placeholder:text-sm bg-white focus:bg-gray-100'
          id='password'
          name='password'
          type='password'
          placeholder='Your Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className='text-white bg-gradient-to-r from-blue-turquoise to-blue-sky text-base font-semibold py-3 px-6 cursor-pointer'
          type='submit'
          value='Sign in to DHA'
        />

        {error && <p className='text-red-600'>{error}</p>}

        <Link href='/forgot-password'>
          <a className='text-sm font-bold'>Forgot Password?</a>
        </Link>
      </form>

      <div className='absolute top-3 right-3'>
        <XIcon
          width={24}
          height={24}
          className='cursor-pointer'
          onClick={() => setShowSignin(false)}
        />
      </div>
    </div>
  )
}
