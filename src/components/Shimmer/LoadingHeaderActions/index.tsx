import React from 'react'

import Skeleton from '../../Skeleton'
import { Container } from './styles'

const LoadingHeaderActions: React.FC = () => {
  return (
    <Container>
      <Skeleton className="button-skeleton" />
    </Container>
  )
}

export default LoadingHeaderActions
