'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

function Nav() {
  const isUserLoggedIn = true;
  const [providers, setProvidersS] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false);


  useEffect(() => {
    const setProviders = async () => {
      // const response = await getProviders();
      // setProvidersS(response)
    }
    setProviders()
  }, [])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image alt='Prompotia logo' src={'/assets/images/logo.svg'} width={30} height={30} className='object-contain' />
        <p className='logo_text'>Prompotia</p>
      </Link>
      {/* Desktop  Nav bar */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (<div className='flex gap-3 md:gap-5'>
          <Link
            href={'/create-promt'}
            className='black_btn'>
            Create a Post
          </Link>
          <button
            type='button'
            onClick={() => signOut}
            className='outline_btn'
          >
            Sign Out
          </button>
          <Link
            href={'/profile'}
          >
            <Image
              src='/assets/images/logo.svg'
              alt='profile'
              className='rounded-full'
              width={37}
              height={37}
            />
          </Link>
        </div>) : (<>
          {providers &&
            Object.values(providers).map(prv => (
              <button
                type='button'
                key={prv.name}
                onClick={() => signIn(prv.id)}
                className='vlack_btn'
              >
                Sign In
              </button>
            ))
          }
        </>)}
      </div>
      {/* Mobile Nav bar */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ?
          <div className='flex'>
            <Image
              src='/assets/images/logo.svg'
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link href='/create-promt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button type='button' onClick={() => {
                  setToggleDropdown(false)
                  signOut()
                }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          :
          (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}

      </div>

    </nav >
  )
}

export default Nav