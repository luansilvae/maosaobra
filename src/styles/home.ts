import styled from 'styled-components'

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
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.4rem;
      color: #616161;
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

  .found-professionals {
    background: #ffffff;
    border: 0.5px solid #d6d6d6;
    border-radius: 5px;
    padding: 1rem 2rem;
    text-align: center;
    margin: 2rem auto;

    span {
      font-size: 1.8rem;
      font-weight: 500;
      line-height: 2.4rem;
      color: #616161;
    }
  }

  @media (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 600px;

  .search {
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
      background: #fbfbfb;
      border-radius: 5px;
      border: 0.5px solid #e6e6e6;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05),
        0px 4px 16px rgba(0, 0, 0, 0.06);

      @media (max-width: 654px) {
        flex-direction: column;
        max-width: 100vw;
      }

      input {
        border-radius: 5px;
        border: 0.5px solid #d6d6d6;
        background: #ffffff;
        padding: 1rem 2rem;
        color: #808086;
        font-size: 1.6rem;
        line-height: 2.4rem;
        outline: 0;

        @media (max-width: 480px) {
          font-size: 1.8rem;
        }

        &:focus {
          border-color: ${props => props.theme.colors.primary};
        }
      }

      select {
        border-radius: 5px;
        border: 0.5px solid #d6d6d6;
        background: #ffffff;
        padding: 1rem 10rem 1rem 2rem;
        color: #808086;
        font-size: 1.6rem;
        line-height: 2.4rem;
        outline: 0;
        cursor: pointer;

        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg fill='grey' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: 96%;
        background-position-y: 9px;

        @media (max-width: 480px) {
          font-size: 1.8rem;
        }

        &:focus {
          border-color: ${props => props.theme.colors.primary};
        }

        option {
          background: #edfff4;
          font-size: 1.7rem;
          color: #1dbf73;
          padding: 3rem;
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

  @media (max-width: 1280px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    height: 100%;

    .illustration {
      display: none;
    }
  }
`

export const Welcome = styled.div`
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
`

export const UsersList = styled.div`
  width: 100%;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

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
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05),
      0px 4px 16px rgba(0, 0, 0, 0.06);

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
