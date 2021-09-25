import styled from 'styled-components'

import { fade, move, moveTop } from '../styles/animations'
export const Container = styled.div`
  max-width: 1580px;
  padding: 2.5rem 4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .found-professionals {
    background: #ffffff;
    border: 0.5px solid #d6d6d6;
    border-radius: 5px;
    padding: 1rem 2rem;
    text-align: center;
    margin: 2rem auto;

    span {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 2.4rem;
      color: ${props => props.theme.colors.title};
    }
  }

  @media (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    height: 100%;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`

export const LandingContainer = styled.div`
  max-width: 1580px;
  padding: 2.5rem 4rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 9.4rem);

  @media (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }

  .found-professionals {
    background: #ffffff;
    border: 0.5px solid #d6d6d6;
    border-radius: 5px;
    padding: 1rem 2rem;
    text-align: center;
    margin: 2rem auto;

    span {
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 2.4rem;
      color: tomato;
    }
  }

  .welcome {
    animation: ${move} 1s;

    h1 {
      font-size: 4.3rem;
      max-width: 35rem;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 2.2rem;
      font-weight: 400;
      color: ${props => props.theme.colors.text};
      margin-bottom: 2rem;
    }

    a {
      background: none;
      border: none;
      color: ${props => props.theme.colors.primary};
      font-weight: 700;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 35rem;
      cursor: pointer;
    }

    @media (max-width: 950px) {
      display: flex;
      align-items: center;
      flex-direction: column;
      h1,
      h2,
      a {
        width: 100%;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 3.5rem;
      }

      h2 {
        font-size: 1.7rem;
      }

      a {
        font-size: 1.5rem;
        justify-content: center;
      }
    }
  }

  img {
    overflow: hidden;
    animation: ${fade} 1s;
  }
`

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 600px;

  @media (max-width: 1280px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    height: 100%;

    .illustration {
      display: none;
    }
  }

  .search {
    animation: ${move} 1s;

    h1 {
      font-size: 4rem;
      max-width: 55rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 1280px) {
      text-align: center;
      h1 {
        font-size: 3rem;
      }
    }

    .search-box {
      background: #ffffff;
      border-radius: 5px;
      border: 0.5px solid #e6e6e6;
      padding: 4rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      .input {
        input {
          border-radius: 5px;
          border: 0.5px solid #d6d6d6;
          background: #ffffff;
          padding: 0.7rem 1rem;
          font-size: 1.6rem;
          line-height: 2.4rem;
          outline: 0;
          color: ${props => props.theme.colors.title};

          transition: border-color 0.2ms;

          &:focus {
            border-color: #8d8d8d;
          }

          &:disabled {
            color: #8d8d8d;
          }
        }

        position: relative;
      }

      .custom-select {
        width: 30rem;
      }

      .error {
        input {
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
          width: 100%;
          position: absolute;
          display: flex;

          font-size: 1.5rem;
          margin-top: 0.5rem;
          color: #e72626;

          svg {
            margin-right: 0.6rem;
          }
        }
      }

      @media (max-width: 660px) {
        flex-direction: column;
        max-width: 100vw;
        padding: 2rem;

        .input {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .custom-select {
          width: 100%;
        }

        .error-message {
          top: 4.2rem;
        }

        button {
          margin-top: 2.5rem;
          width: 100%;
        }
      }

      button {
        background: #1dbf73;
        border-radius: 5px;
        padding: 0.8rem 2rem;
        border: 0;
        color: #ffffff;
        line-height: 2.4rem;
        font-weight: 500;
        font-size: 1.6rem;
        cursor: pointer;

        @media (max-width: 480px) {
          font-size: 1.8rem;
        }

        &:hover {
          background-color: #18a061;
        }
      }
    }
  }

  .illustration {
    animation: ${fade} 1s;
  }
`

export const UsersList = styled.div`
  width: 100%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  animation: ${moveTop} 1s;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 780px) {
    display: flex;
    flex-direction: column;
  }

  .card-user {
    background: #ffffff;
    border-radius: 5px;
    border: 0.5px solid #ececec;
    padding: 3rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    overflow: hidden;

    > span {
      color: ${props => props.theme.colors.text};
      font-size: 1.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-data-content {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;

      img {
        border-radius: 50%;
        border: 3px solid #ffffff;
        width: 80px;
        height: 80px;

        @media (max-width: 420px) {
          width: 50px;
          height: 50px;
        }
      }
      .user-info {
        h1 {
          font-weight: 500;
          font-size: 2rem;
          margin-bottom: 6px;

          cursor: pointer;
          transition: color 200ms;

          &:hover {
            color: ${props => props.theme.colors.primary};
          }
        }

        span {
          font-size: 1.5rem;
          color: ${props => props.theme.colors.text};
          white-space: pre-wrap;
          display: flex;
          align-items: center;
          margin-left: -2px;

          svg {
            color: ${props => props.theme.colors.primary};
            margin-right: 1rem;
          }
        }
      }
    }

    .description {
      margin-top: 2rem;
      display: flex;
      max-width: 100%;
      flex-wrap: wrap;
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
`

export const Pagination = styled.div`
  .actions {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 5rem;
    margin-bottom: 2rem;

    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 1.5rem;
      font-weight: 500;
      border-radius: 5px;
      border: 0;
      background: ${props => props.theme.colors.primary};
      color: #ffffff;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);

      transition: background-color 0.2s;

      &:enabled:hover {
        background-color: #18a061;
      }

      &:disabled {
        background: #ebebeb;
        color: #9b9b9b;
        cursor: not-allowed;
      }
    }
  }
`
