import styled from 'styled-components'
import { fade, move } from '../../styles/animations'

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
    }

    .cards-container {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .card {
        padding: 3rem;
        background-color: #ffffff;
        border: 0.5px solid #f0f0f0;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .professional-card {
        gap: 2rem;
        text-align: center;
        max-height: 30rem;

        animation: ${fade} 1s;

        svg {
          color: ${props => props.theme.colors.primary};
        }

        span {
          font-size: 1.7rem;
          font-weight: 500;
          color: ${props => props.theme.colors.title};
        }

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

        .specialties {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          gap: 1rem;

          overflow-y: auto;

          ::-webkit-scrollbar {
            width: 4px;
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

          span {
            background: #edfff4;
            padding: 0.5rem;
            border-radius: 5px;
            font-size: 1.4rem;
            color: #1dbf73;
            border: solid 1.5px #1dbf73;
            font-weight: 500;

            @media (max-width: 480px) {
              font-size: 1.5rem;
            }
          }

          @media (max-width: 720px) {
            justify-content: center;
          }
        }
      }

      .favorites-card {
        h3 {
          text-align: center;
          color: ${props => props.theme.colors.title};
          font-size: 1.8rem;
        }

        .favorites-content {
          width: 100%;
          background-color: #fbfbfb;
          border-radius: 5px;
          border: 0.5px solid #f0f0f0;
          padding: 3rem;
          margin-top: 3rem;

          max-height: 30rem;
          overflow-y: hidden;

          &:hover {
            overflow-y: auto;
          }

          ::-webkit-scrollbar {
            width: 4px;
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

          ul {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          ul li {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            svg {
              color: ${props => props.theme.colors.primary};

              transition: color 200ms;

              &:hover {
                color: #18a061;
              }
            }
          }

          .favorite-info {
            display: flex;
            align-items: center;
            gap: 1.5rem;

            img {
              border-radius: 50%;
              width: 50px;
              height: 50px;
            }

            span {
              color: ${props => props.theme.colors.title};
              font-size: 1.7rem;
              font-weight: 500;

              transition: color 200ms;

              &:hover {
                color: ${props => props.theme.colors.primary};
              }
            }
          }
        }
      }
    }
  }

  .scroll {
    ::-webkit-scrollbar {
      width: 4px;
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
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    label {
      font-size: 1.4rem;
      font-weight: 400;
      color: ${props => props.theme.colors.title};
      @media (max-width: 480px) {
        font-size: 1.6rem;
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
`

export default Container
