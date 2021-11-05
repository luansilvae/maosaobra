import styled, { css } from 'styled-components'

import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa'

export const Container = styled.footer`
  background: #f2f2f2;
`

export const Content = styled.div`
  max-width: 1580px;
  padding: 5rem 4rem;
  margin: 0 auto;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  a {
    display: flex;
    align-items: center;

    img {
      width: 4.5rem;
    }

    span {
      margin-left: 1rem;
      font-size: 2.2rem;
      font-weight: 700;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Socials = styled.div`
  display: flex;
  gap: 1rem;
`

const iconCss = css`
  padding: 1rem;
  background: #edfff4;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.colors.primary};
  width: 5rem;
  height: 5rem;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`

export const FacebookIcon = styled(FaFacebook)`
  ${iconCss}
`

export const InstagramIcon = styled(FaInstagram)`
  ${iconCss}
`

export const TwitterIcon = styled(FaTwitter)`
  ${iconCss}
`

export const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;

  li {
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const Contact = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 1.5rem;

  li,
  a {
    display: flex;
    align-items: center;
  }

  li:first-child {
    color: ${props => props.theme.colors.title};
    font-size: 1.7rem;
    font-weight: 500;
  }

  li a {
    color: ${props => props.theme.colors.text};
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
  }
`
export const EmailIcon = styled(FaEnvelope)``
