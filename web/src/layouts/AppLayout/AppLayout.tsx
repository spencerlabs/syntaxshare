import { Link, SkipNavLink, SkipNavContent, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import '@reach/skip-nav/styles.css'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <>
      <SkipNavLink contentId="main" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <header className="flex items-center justify-between space-x-4 px-wrap py-2">
        <Link
          to={isAuthenticated ? routes.workspaces() : routes.home()}
          className="font-mono text-lg font-semibold"
        >
          Syntax Snap
        </Link>

        <nav className="space-x-3 font-mono text-sm font-semibold">
          {!isAuthenticated ? (
            <>
              <Link to={routes.login()}>Log In</Link>
              <Link
                to={routes.signup()}
                className="rounded-md bg-emerald-500 px-3 py-2 text-stone-900 hover:bg-emerald-600 hover:text-stone-900"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button onClick={logOut}>Log Out</button>
            </>
          )}
        </nav>
      </header>

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
