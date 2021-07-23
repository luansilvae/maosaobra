import styled from 'styled-components'

export const Container = styled.div`
  height: calc(100vh - 9.4rem);
  max-width: 550px;
  align-items: center;
  display: flex;
  margin: 0 auto;
  text-align: center;
  padding: 0 4rem;

  a.signin {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 500;
    border: none;
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
    border-radius: 5px;
    padding: 1.2rem;
    justify-content: center;
    margin-top: 3rem;
  }

  div.image {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;
  }
`
