import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -135% 0%;
  }
`

export default styled.div`
  background: linear-gradient(-90deg, #ced3d6 0%, #f8f8f8 50%, #ced3d6 100%);

  background-size: 400% 400%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`
