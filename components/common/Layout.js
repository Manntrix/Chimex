import PropTypes from 'prop-types'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { signOut, useSession } from 'next-auth/react'

export default function Layout({ children, header, pushdown = false }) {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    if (session?.accessTokenExpires < new Date().getTime()) {
      signOut()
    }
  }

  return (
    <>
      <Header version={header} pushdown={pushdown} />
      <main id='page-content' style={{ minHeight: '20em' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
}
