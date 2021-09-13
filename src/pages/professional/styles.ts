import styled from 'styled-components'

const Container = styled.div`
  .user-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1100px;

    gap: 3rem;
    padding: 6rem 2rem;

    @media (max-width: 950px) {
      flex-direction: column;
    }

    @media (max-width: 480px) {
      padding: 2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 2rem;

      h1 {
        font-size: 3.6rem;
        color: ${props => props.theme.colors.title};
        font-weight: 600;
      }

      img {
        border-radius: 50%;
        width: 118px;
        height: 118px;
      }

      @media (max-width: 720px) {
        flex-direction: column;

        h1 {
          font-size: 3rem;
          text-align: center;
        }
      }
    }

    .specialties {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      gap: 1rem;

      span {
        background: #edfff4;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 1.4rem;
        color: #1dbf73;
        border: solid 1.5px #1dbf73;
        font-weight: 500;
      }

      @media (max-width: 720px) {
        justify-content: center;
      }
    }

    .user-location {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      span {
        font-size: 1.6rem;
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

      .edit-profile {
        a {
          padding: 0.6rem;
          background-color: #ffffff;
          border: solid 1px #d6d6d6;
          font-weight: 500;
          border-radius: 5px;

          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 200ms ease-in;

          svg {
            color: ${props => props.theme.colors.primary};
            margin-right: 0.6rem;
          }

          &:hover {
            border-color: ${props => props.theme.colors.primary};
          }
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
