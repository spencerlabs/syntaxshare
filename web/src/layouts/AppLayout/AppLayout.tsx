import { useState } from 'react'

import { Link, SkipNavLink, SkipNavContent, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import LoginPopup from 'src/components/LoginPopup'

import '@reach/skip-nav/styles.css'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <>
      <SkipNavLink contentId="main" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />

      <header className="flex items-center justify-between space-x-4 px-wrap py-2">
        <Link to={routes.home()} className="text-lg font-semibold">
          Syntax Share
        </Link>

        <nav className="space-x-3 text-sm font-semibold">
          {!isAuthenticated ? (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="block rounded-md bg-emerald-500 px-3 py-2 text-stone-900 hover:bg-emerald-600 hover:text-stone-900"
            >
              Log In or Sign Up
            </button>
          ) : (
            <button
              onClick={logOut}
              className="transition-colors hover:text-emerald-500"
            >
              Log Out
            </button>
          )}
        </nav>
      </header>

      <LoginPopup isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

      <SkipNavContent id="main" />

      <main className="flex-1 px-wrap py-12">{children}</main>

      <footer className="px-wrap py-1">
        <p className="text-center text-2xs">
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a
            href="https://spencer.dev"
            target="_blank"
            rel="noreferrer"
            className="font-semibold"
          >
            Spencer Labs LLC
          </a>
          . All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default AppLayout
