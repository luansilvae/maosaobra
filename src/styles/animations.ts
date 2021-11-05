import { keyframes } from 'styled-components'

export const fade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

export const move = keyframes`
 from {
    opacity: 0;
    transform: translateX(-35%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`

export const moveTop = keyframes`
 from {
    opacity: 0;
    transform: translateY(40%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`

export const moveDown = keyframes`
 from {
    opacity: 0;
    transform: translateY(-40%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`
