import styled from 'styled-components'

const Container = styled.div`
  max-width: 1000px;
  padding: 0 4rem;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  .forms-container {
    background: #fff;
    border: 0.5px solid #ececec;
    border-radius: 5px;

    @media (max-width: 480px) {
      border-radius: 0;
    }
  }

  @media (max-width: 480px) {
    padding: 0;
    > div {
      border: none;
    }
  }
`

export const UserFormContainer = styled.div`
  .user-data-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    img {
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary};
    }
    .user-info {
      h1 {
        font-weight: 600;
        font-size: 2.5rem;
      }

      span {
        font-size: 1.5rem;
        color: ${props => props.theme.colors.text};
      }
    }

    @media (max-width: 470px) {
      flex-direction: column;
      gap: 2rem;
      text-align: center;

      img {
        width: 80px;
        height: 80px;
      }
    }
  }
`

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 2rem;
  gap: 2rem;

  @media (max-width: 580px) {
    display: flex;
    flex-direction: column;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    label {
      font-size: 1.4rem;
      font-weight: 400;
      color: ${props => props.theme.colors.text};
      @media (max-width: 480px) {
        font-size: 1.8rem;
      }
    }

    input,
    textarea,
    select {
      margin-top: 0.7rem;
      padding: 1rem 2rem;
      border-radius: 5px;
      border: solid 0.5px #d6d6d6;
      background-color: #ffffff;
      font-size: 1.6rem;
      outline: 0;
      line-height: 2.4rem;
      color: ${props => props.theme.colors.title};

      transition: border-color 0.2ms;

      @media (max-width: 480px) {
        font-size: 2rem;
      }

      &:focus {
        border-color: ${props => props.theme.colors.primary};
      }
    }

    select {
      cursor: pointer;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='grey' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      background-repeat: no-repeat;
      background-position-x: 96%;
      background-position-y: 9px;

      option {
        background: #edfff4;
        font-size: 1.7rem;
        color: #1dbf73;
        padding: 3rem;
      }
    }
  }

  .select-group {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    .select {
      margin-top: 0.7rem;
      font-family: Poppins;

      > div {
        border-radius: 5px;
        border: solid 0.5px #d6d6d6;
        background-color: #ffffff;
        color: #000;
        font-size: 1.6rem;
        padding: 0.35rem 0 0.35rem 1rem;

        @media (max-width: 480px) {
          font-size: 2rem;
        }

        transition: border-color 2ms;

        &:focus-within {
          border-color: ${props => props.theme.colors.primary};
          box-shadow: none;
        }
      }
    }

    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    label {
      font-size: 1.4rem;
      font-weight: 400;
      color: ${props => props.theme.colors.text};
      @media (max-width: 480px) {
        font-size: 1.8rem;
      }
    }

    .especialidades {
      margin-top: 2rem;
      display: flex;
      flex-wrap: wrap;
      max-width: 43rem;
      gap: 1rem;
      span {
        background: #edfff4;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 1.4rem;
        color: #1dbf73;
        border: solid 1px #1dbf73;
      }
    }
  }

  textarea {
    resize: vertical;
  }
`

export const SubmitDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 3rem auto 2rem auto;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 2rem;
  }

  button {
    padding: 1rem 4rem;
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
    font-weight: 500;
    border: 0;
    border-radius: 5px;
    cursor: pointer;

    transition: background-color 0.2s;

    @media (max-width: 480px) {
      width: 100%;
      padding: 1rem auto;
      font-size: 1.8rem;
    }

    &:hover {
      background-color: #18a061;
    }
  }

  button:nth-child(2) {
    background-color: #d83024;

    &:hover {
      background-color: #bb3127;
    }
  }
`

export const ProfessionalFormContainer = styled.div`
  h2 {
    margin-top: 2rem;
    text-align: center;
  }
`

export const ModalItem = styled.div`
  font-size: 1.7rem;
  color: ${props => props.theme.colors.title};
  text-align: center;

  .actions {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    button {
      padding: 1rem;
      background: ${props => props.theme.colors.primary};
      color: #ffffff;
      font-weight: 500;
      border: 0;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.5rem;

      transition: background-color 0.2s;

      &:hover {
        background-color: #18a061;
      }
    }

    button:nth-child(2) {
      background-color: #d83024;

      &:hover {
        background-color: #bb3127;
      }
    }
  }
`

export default Container
