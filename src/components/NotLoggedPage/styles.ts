import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 3rem;
  height: calc(100vh - 8.1rem);

  .unauthorized-page {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 0.7rem;

    h1 {
      font-size: 6rem;
      letter-spacing: 0.5rem;
      color: ${props => props.theme.colors.primary};
    }

    h2 {
      color: ${props => props.theme.colors.title};
    }

    span {
      color: ${props => props.theme.colors.text};
    }

    a {
      margin-top: 1rem;
      font-weight: 500;
      color: ${props => props.theme.colors.primary};
      transition: color 200ms;

      &:hover {
        color: #18a061;
      }
    }
  }
`

export default Container
