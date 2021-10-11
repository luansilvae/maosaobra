import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'
import { useFetch } from '../../hooks/useFetch'
import capitalizeString from '../../utils/capitalizeString'
import LoadingHeaderActions from '../Shimmer/LoadingHeaderActions'
import { moveDown } from '../../styles/animations'

const NavbarContainer = styled.div`
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  padding: 1.8rem 4rem;

  header {
    display: flex;
    align-items: center;
    max-width: 1500px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    padding: 1.8rem 1rem;
  }
`

const LeftSection = styled.div`
  a {
    display: flex;
    align-items: center;

    span {
      margin-left: 1rem;
      font-size: 1.7rem;
      font-weight: 700;
    }
  }
`

const RightSection = styled.div`
  margin-left: auto;
  display: flex;

  .menu {
    position: relative;

    a.menu-button {
      color: ${props => props.theme.colors.title};
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 1rem;

      transition: color 200ms;

      :hover {
        color: ${props => props.theme.colors.primary};
      }

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        border: solid 1px ${props => props.theme.colors.primary};
      }

      @media (max-width: 480px) {
        span {
          display: none;
        }
      }
    }

    .menu-dropdown {
      display: flex;
      flex-direction: column;

      animation: ${moveDown} 500ms;

      position: absolute;
      top: 50px;
      z-index: 30;
      width: 18rem;
      right: 0;
      padding: 1rem;
      background: #ffffff;
      border-radius: 5px;
      border: solid 1px #eeeeee;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05),
        0px 4px 16px rgba(0, 0, 0, 0.06);

      @media (max-width: 480px) {
        width: 70vw;
      }

      a {
        cursor: pointer;
        padding: 1rem 2rem 1rem;
        font-weight: 500;
        color: ${props => props.theme.colors.title};
        border-right: 2px solid transparent;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-radius: 5px 0 0 5px;

        transition: all 200ms;
        transition: border-right 200ms ease-in;

        :hover {
          color: ${props => props.theme.colors.primary};
          border-right: 2px solid ${props => props.theme.colors.primary};
          background: #f1f1f196;
        }

        @media (max-width: 480px) {
          font-size: 2rem;
        }
      }

      &::after {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        top: -10px;
        right: 8px;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid #eeeeee;
      }

      &::before {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        top: -8.5px;
        right: 8px;
        z-index: 200;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid #ffffff;
      }
    }

    .hidden {
      display: none;
    }
  }

  .signin {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    border: none;
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
    border-radius: 5px;
    padding: 0.9rem 2rem;

    transition: background-color 0.2s;

    &:hover {
      background-color: #18a061;
    }
  }
`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, loading] = useSession()

  const { data } = useFetch(`/api/user/${session?.user.email}`)

  return (
    <NavbarContainer>
      <header>
        <LeftSection>
          <Link href="/">
            <a>
              <img src="/logo.svg" alt="Mãos à Obra" />
              <span>Mãos à Obra</span>
            </a>
          </Link>
        </LeftSection>

        <RightSection>
          {session ? (
            !data || loading ? (
              <LoadingHeaderActions />
            ) : (
              <div className="menu">
                <a
                  href="#"
                  className="menu-button"
                  onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
                >
                  <span>{capitalizeString(data.name)}</span>
                  <img src={data.image} alt="User Avatar" />
                </a>
                <div className={isOpen ? 'menu-dropdown' : 'hidden'}>
                  <Link href="/profile">
                    <a
                      onClick={() => {
                        setIsOpen(false)
                      }}
                    >
                      Meu Perfil
                    </a>
                  </Link>

                  <a
                    onClick={() => {
                      setIsOpen(false)
                      signOut({ callbackUrl: '/', redirect: true })
                    }}
                  >
                    Sair
                  </a>
                </div>
              </div>
            )
          ) : loading ? (
            <LoadingHeaderActions />
          ) : (
            <Link href="/signin">
              <button className="signin">Entrar</button>
            </Link>
          )}
        </RightSection>
      </header>
    </NavbarContainer>
  )
}
