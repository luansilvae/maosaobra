import Link from 'next/link'

import Container from './styles'

export default function Unauthorized() {
  return (
    <Container>
      <div className="unauthorized-page">
        <h1>401.</h1>
        <h2>Oops! Algo deu errado :(</h2>
        <span>Você não têm acesso à essa página.</span>
        <Link href="/">
          <a>Voltar para o Início</a>
        </Link>
      </div>
    </Container>
  )
}
