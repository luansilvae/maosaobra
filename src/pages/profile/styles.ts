import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 4rem;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }

  .header-profile {
    width: 100%;
    display: flex;

    @media (max-width: 480px) {
      justify-content: center;

      h1 {
        font-size: 2.4rem;
      }
    }
  }

  h1 {
    margin-bottom: 4rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 2rem;
      color: ${props => props.theme.colors.primary};
    }
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }

    .form {
      padding: 3rem;
      background-color: #ffffff;
      border: 0.5px solid #f0f0f0;
      border-radius: 5px;

      h3 {
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.title};
        font-size: 1.8rem;

        svg {
          margin-right: 1rem;
          color: ${props => props.theme.colors.primary};
        }
      }

      .title-address {
        margin-top: 5rem;
      }

      .submit-user {
        display: flex;
        justify-content: right;
        margin-top: 3rem;

        button {
          padding: 1rem 4rem;
          background: ${props => props.theme.colors.primary};
          color: #ffffff;
          font-weight: 500;
          border: 0;
          border-radius: 5px;
          cursor: pointer;

          transition: background-color 0.2s;

          &:hover {
            background-color: #18a061;
          }

          &:disabled {
            background: #d1d1d1;
            cursor: default;
          }

          @media (max-width: 480px) {
            width: 100%;
            padding: 1rem auto;
            font-size: 1.8rem;
          }
        }
      }

      .submit-professional {
        display: flex;
        justify-content: right;
        margin-top: 3rem;

        button {
          padding: 1rem 4rem;
          background: #ffffff;
          border: solid 1px ${props => props.theme.colors.primary};
          color: ${props => props.theme.colors.primary};
          font-weight: 500;
          border-radius: 5px;
          cursor: pointer;

          transition: background-color 0.2s;

          &:hover {
            background-color: #18a061;
            color: #ffffff;
          }

          &:disabled {
            background: #d1d1d1;
            color: #ffffff;
            cursor: default;
            border: 0;
          }

          @media (max-width: 480px) {
            width: 100%;
            padding: 1rem auto;
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .delete-button {
    padding: 2rem 0 0 0;
    font-weight: 500;
    cursor: pointer;

    color: #e72626;

    &:hover {
      color: #d43333;
    }
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    label {
      font-size: 1.4rem;
      font-weight: 400;
      color: ${props => props.theme.colors.title};
      @media (max-width: 480px) {
        font-size: 1.5rem;
      }
    }

    input,
    textarea {
      margin-top: 0.7rem;
      padding: 1rem;
      border-radius: 5px;
      border: solid 0.5px #d6d6d6;
      background-color: #ffffff;
      font-size: 1.7rem;
      outline: 0;
      line-height: 2.4rem;
      color: ${props => props.theme.colors.title};
      resize: vertical;

      transition: border-color 0.2ms;

      @media (max-width: 480px) {
        font-size: 1.8rem;
      }

      &:focus {
        border-color: #8d8d8d;
      }

      &:disabled {
        color: #8d8d8d;
      }
    }
  }

  .error {
    input,
    textarea {
      border-color: #e72626;
    }

    .custom-select {
      > div {
        border-color: #e72626;

        .css-1wa3eu0-placeholder {
          color: #e72626;
        }
      }
    }

    .error-message {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      margin-top: 1rem;
      color: #e72626;

      svg {
        margin-right: 0.6rem;
      }
    }
  }

  .custom-select {
    margin-top: 0.7rem;
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
      background-color: #e72626;

      &:hover {
        background-color: #d43333;
      }
    }
  }
`

export default Container
