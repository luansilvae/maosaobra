import styled from 'styled-components'

const Container = styled.div`
  max-width: 1080px;
  height: calc(100vh - 9.4rem);
  margin: 0 auto;
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1160px) {
    flex-direction: column;
    justify-content: center;
    gap: 4rem;
    text-align: center;
  }
`

export const LoginBoxBrand = styled.div`
  width: 60rem;
  padding: 0 2rem;

  h1 {
    font-size: 4.3rem;
    color: ${props => props.theme.colors.title};
  }

  h2 {
    font-size: 2.2rem;
    color: ${props => props.theme.colors.title};
    font-weight: 400;
  }

  @media (max-width: 950px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 3.5rem;
    }

    h2 {
      font-size: 1.7rem;
    }
  }
`

export const LoginBox = styled.div`
  width: 50rem;
  background: ${props => props.theme.colors.background};
  border: 0.5px solid #ececec;
  border-radius: 5px;
  text-align: center;
  padding: 4rem 7rem;

  @media (max-width: 540px) {
    width: 100%;
    border: none;
    box-shadow: none;
    padding: 0 2rem;
  }

  h2 {
    font-size: 3.5rem;
    letter-spacing: -0.0024em;
    line-height: 50px;

    color: ${props => props.theme.colors.title};
    font-weight: 500;
  }

  h3 {
    font-size: 2rem;
    margin-top: 1rem;
    font-weight: initial;
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.7rem;
    }
  }
`

export const LoginOptions = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  button {
    font-size: 1.6rem;
    background: ${props => props.theme.colors.background};
    cursor: pointer;
    width: 100%;
    padding: 1.2rem 2rem;
    font-weight: 500;
    color: ${props => props.theme.colors.text};
    border: 0.5px solid #ececec;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05),
      0px 4px 16px rgba(0, 0, 0, 0.06);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export default Container
