import React from 'react'
import styled from 'styled-components'

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const LogoImg = styled.div`
  width: 38px;
  height: 44px;

  img {
    width: 100%;
    height: 100%;
  }
`

const LogoText = styled.span`
  margin-left: 1rem;
  font-size: 1.7rem;
  font-weight: 700;
`

export default function Logo() {
  return (
    <LogoWrapper>
      <LogoImg>
        <img src="/logo.svg" alt="Mãos à Obra" />
      </LogoImg>
      <LogoText>Mãos à Obra</LogoText>
    </LogoWrapper>
  )
}
