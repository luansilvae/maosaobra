import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html { 
    font-size: 62.5%;

    ::-webkit-scrollbar {
        width: 10px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #d1d1d1;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.primary};
        border-radius: 10px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #18a061;
      }
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.title};
  }

  button, input, textarea, select {font: 400 1.6rem 'Poppins', sans-serif;}

  body { 
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.title};
    font: 400 1.6rem 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased !important;
  }

  @media(max-width: 720px) {
    html {
      font-size: 59.5%;
    }
  }

  @media(max-width: 480px) {
    html {
      font-size: 57.5%;
    }
  }
`
