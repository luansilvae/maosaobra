import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AiOutlineLoading } from 'react-icons/ai'

const LoadingBox = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const spin = keyframes`
 from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  animation: ${spin} 800ms linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`
const Loading: React.FC = () => {
  return (
    <LoadingBox>
      <LoadingSpinner>
        <AiOutlineLoading size={100} color={'#1dbf73'} />
      </LoadingSpinner>
    </LoadingBox>
  )
}

export default Loading
