import Link from 'next/link'
import {
  Container,
  Content,
  Brand,
  Socials,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  Links,
  Contact,
  EmailIcon
} from './styles'

export default function Footer() {
  return (
    <Container>
      <Content>
        <Brand>
          <Link href="/">
            <a>
              <img src="/logo.svg" alt="Mãos à Obra" />
              <span>Mãos à Obra</span>
            </a>
          </Link>

          <Socials>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </Socials>

          <Links>
            <li>
              <a href="#">Sobre nós</a>
            </li>
            <li>
              <a href="#">Termos de uso</a>
            </li>
            <li>
              <a href="#">Políticas de privacidade</a>
            </li>
          </Links>
        </Brand>

        <Contact>
          <li>Alguma dúvida?</li>
          <li>
            <a href="#">
              <EmailIcon /> contato@maosaobra.com
            </a>
          </li>
        </Contact>
      </Content>
    </Container>
  )
}
