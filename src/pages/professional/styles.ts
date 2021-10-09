import styled from 'styled-components'
import { fade, moveTop } from '../../styles/animations'

const Container = styled.div`
  .user-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1100px;
    gap: 3rem;
    padding: 6rem 4rem;

    animation: ${fade} 1s;

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
      gap: 1rem;
      flex-wrap: wrap;

      max-width: 55rem;
      margin-top: 1rem;
      max-height: 8rem;
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 15px;
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
      }

      @media (max-width: 720px) {
        justify-content: center;
      }
    }

    .user-location {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;

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
          font-size: 1.6rem;
          margin-top: 1rem;

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

  .card-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    max-width: 1100px;
    margin: 0 auto;
    gap: 3rem;
    padding: 0 3rem;

    animation: ${moveTop} 1s;

    @media (max-width: 1070px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 730px) {
      grid-template-columns: 1fr;
      padding: 0 1rem;
      gap: 1rem;
    }
  }

  .about-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @media (max-width: 730px) {
      gap: 1rem;
    }

    .card {
      background: #ffffff;
      border: 0.5px solid #f0f0f0;
      border-radius: 5px;
      padding: 3rem;

      h2 {
        font-size: 2rem;
        font-weight: 500;
        color: ${props => props.theme.colors.title};
      }
      p {
        font-size: 1.6rem;
        color: ${props => props.theme.colors.text};
        margin-top: 2.5rem;
      }
    }
  }

  .card-infos {
    background: #ffffff;
    border: 0.5px solid #f0f0f0;
    border-radius: 5px;
    padding: 3rem;

    h2 {
      font-size: 2rem;
      font-weight: 500;
      color: ${props => props.theme.colors.title};
      margin-bottom: 2.5rem;
    }

    .card-item-container {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 3rem;
      font-size: 1.6rem;

      .card-item:nth-child(2) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .whatsapp-button {
          a {
            border: 2px solid ${props => props.theme.colors.primary};
            border-radius: 5px;
            display: flex;
            align-items: center;
            padding: 0.4rem;
          }

          svg {
            color: #00e676;
          }
        }
      }

      .card-item span {
        display: flex;
        align-items: center;
        color: #a8aaba;
        margin-bottom: 0.7rem;

        svg {
          margin-right: 1rem;
        }
      }
      .card-item a {
        color: ${props => props.theme.colors.primary};
        font-weight: 500;

        transition: filter 200ms;

        &:hover {
          filter: brightness(90%);
        }
      }

      .card-item p {
        font-weight: 500;
        color: ${props => props.theme.colors.title};
      }
    }
  }
`

export default Container
