import styled from 'styled-components'
import { fade, move, moveTop } from '../../../styles/animations'

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

    animation: ${move} 1s;

    svg {
      margin-right: 2rem;
      color: ${props => props.theme.colors.primary};
    }
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }

    .form {
      padding: 3rem;
      background-color: #ffffff;
      border: 0.5px solid #f0f0f0;
      border-radius: 5px;

      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;

      animation: ${fade} 1s;

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

      .submit-professional {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3rem;

        @media (max-width: 480px) {
          flex-direction: column-reverse;
          gap: 2rem;
        }

        .delete-button {
          font-weight: 500;
          cursor: pointer;
          color: #e72626;

          &:hover {
            color: #d43333;
          }
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
    }
  }

  .hidden-container {
    display: none;
  }

  .modal-container {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.164);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;

    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      animation: ${moveTop} 500ms;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 2rem;
      padding: 2rem;
      position: relative;
      background: white;
      border-radius: 5px;

      .modal-content {
        display: flex;
        align-items: top;
        width: 100%;
        gap: 1.5rem;

        span {
          background: #ffdfde;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 38px;
          width: 38px;
          min-width: 38px;
          min-height: 38px;
          border-radius: 50%;

          svg {
            color: #be2b23;
          }
        }

        h3 {
          font-weight: 500;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.5rem;
          color: ${props => props.theme.colors.text};
        }
      }

      .modal-actions {
        width: 100%;
        margin-top: 2rem;
        gap: 2rem;
        display: flex;
        justify-content: right;

        @media (max-width: 480px) {
          justify-content: center;
          align-items: center;
        }

        button {
          padding: 0.5rem 1.3rem;
          font-weight: 400;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          font-size: 1.5rem;
          transition: background-color 200ms;
        }

        button.btn-cancel {
          background: #ffffff;
          border: solid 0.5px #d6d6d6;
          color: ${props => props.theme.colors.title};

          &:hover {
            background-color: #fafafa;
          }
        }

        button.btn-delete {
          background: #e72626;
          color: #ffffff;

          &:hover {
            background-color: #c41818;
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

  .flex {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
    .input {
      width: 100%;
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
      background-color: #fbfbfb;
      font-size: 1.7rem;
      outline: 0;
      line-height: 2.4rem;
      color: ${props => props.theme.colors.title};
      resize: vertical;

      transition: all 200ms;

      @media (max-width: 480px) {
        font-size: 1.8rem;
      }

      &:focus {
        border-color: #8d8d8d;
        background-color: #ffffff;
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

export default Container
