import styled from 'styled-components'

const Container = styled.div`
  max-width: 100vw;
  margin: 6rem auto;
  padding: 0 2.5rem;

  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 3rem;
  }

  .user-content {
    display: flex;
    align-items: center;
    gap: 3rem;
    justify-content: center;
    padding-bottom: 2rem;

    img {
      border-radius: 50%;
      width: 118px;
      height: 118px;
    }

    @media (max-width: 950px) {
      flex-direction: column;
    }

    .user-info {
      display: flex;
      flex-direction: column;

      @media (max-width: 950px) {
        align-items: center;
      }

      > p {
        margin-top: 2rem;
        color: ${props => props.theme.colors.text};
        font-size: 1.6rem;

        span {
          color: ${props => props.theme.colors.title};
          font-weight: 500;
        }
      }

      .user-info-data {
        display: flex;
        align-items: center;
        gap: 3rem;

        h1 {
          font-size: 4.1rem;
          color: ${props => props.theme.colors.title};
          font-weight: 500;
        }

        span {
          font-size: 1.7rem;
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

        @media (max-width: 950px) {
          flex-direction: column;
          gap: 0;
          margin-bottom: 3rem;

          h1 {
            font-size: 3rem;
            text-align: center;
          }
        }
      }

      .description {
        margin-top: 1rem;
        display: flex;
        max-width: 100%;
        flex-wrap: wrap;
        gap: 1rem;

        @media (max-width: 625px) {
          justify-content: center;
        }

        span {
          background: #edfff4;
          padding: 0.5rem;
          border-radius: 5px;
          font-size: 1.4rem;
          color: #1dbf73;
          border: solid 1.5px #1dbf73;
          font-weight: 500;
        }
      }
    }
  }

  .card {
    background: #ffffff;
    border: 0.5px solid #ececec;
    border-radius: 5px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 4rem auto;
    max-width: 650px;

    @media (max-width: 480px) {
      box-shadow: none;
    }

    h2 {
      font-size: 2.3rem;
      font-weight: 500;
      line-height: 3.3rem;
      color: ${props => props.theme.colors.title};
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.7rem;
      color: ${props => props.theme.colors.text};

      span {
        font-weight: 600;
        color: ${props => props.theme.colors.title};
      }
    }

    button {
      background: ${props => props.theme.colors.primary};
      color: #ffffff;
      font-weight: 500;
      border: 0;
      border-radius: 5px;
      cursor: pointer;
      padding: 1rem;

      margin: 2rem auto 0 auto;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      max-width: 340px;

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
  }
`

export default Container
