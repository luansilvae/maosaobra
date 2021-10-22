import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AiOutlineLoading } from 'react-icons/ai'

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 3rem;

  margin: 0 auto;
  margin-top: 8.2rem;

  height: calc(100vh - 8.2rem);
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
