import styled, { css } from 'styled-components'
import { FaHandshake } from 'react-icons/fa'
import { IoMdSearch } from 'react-icons/io'
import { HiLocationMarker } from 'react-icons/hi'

import { fade, move, moveTop } from '../styles/animations'

export const Container = styled.div`
  max-width: 1580px;
  padding: 2.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 8.2rem;

  min-height: calc(100vh - 8.2rem);

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
  margin-top: 8.2rem;
  height: calc(100vh - 8.2rem);
  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }

  img {
    animation: ${fade} 1s;
  }
`

export const Welcome = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

export const Illustration = styled.div`
  animation: ${fade} 1s;

  @media (max-width: 768px) {
    display: none;
  }
`

export const Intro = styled.div`
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
    border: none;
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 35rem;
    cursor: pointer;

    svg {
      margin-top: 2px;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    a {
      max-width: none;
      font-size: 1.7rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 3.5rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    a svg {
      display: none;
    }
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
      h1 {
        font-size: 3rem;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      h1 {
        color: ${props => props.theme.colors.title};
        text-align: center;
        width: 100%;
        margin: 0.5rem auto 3rem auto;

        @media (max-width: 400px) {
          font-size: 2.3rem;
        }
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
        position: relative;
        input {
          border-radius: 5px;
          border: solid 0.5px #d6d6d6;
          background-color: #ffffff;
          padding: 0.7rem 1rem;
          font-size: 1.7rem;
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

        @media (max-width: 480px) {
          .custom-select,
          input {
            font-size: 1.8rem;
          }
        }
      }

      .custom-select {
        width: 30rem;
        font-size: 1.7rem;
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

      @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        padding: 3rem;

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
        font-size: 1.7rem;
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

export const About = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  h1 {
    font-size: 4.3rem;
    max-width: 35rem;
    margin-bottom: 2rem;
  }

  h2 {
    max-width: 60rem;
    font-size: 2.2rem;
    font-weight: 400;
    color: ${props => props.theme.colors.text};
    margin-bottom: 2rem;
    text-align: right;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    h1,
    h2 {
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.7rem;
    }
  }
`

export const AboutItems = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  h4 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.title};
  }

  span {
    font-size: 1.7rem;
    color: ${props => props.theme.colors.text};
    margin: 1.5rem 0;
    max-width: 40rem;
  }

  a {
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
    padding: 1rem 2rem;
  }
`

const iconCss = css`
  width: 9rem;
  height: 9rem;
  color: ${props => props.theme.colors.primary};
`

export const SearchIcon = styled(IoMdSearch)`
  ${iconCss}
`

export const LocationIcon = styled(HiLocationMarker)`
  ${iconCss}
`

export const CollaborateIcon = styled(FaHandshake)`
  ${iconCss}
`

export const SignUpCard = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: #ffffff;
  border: solid 1px #d6d6d6;
  border-radius: 5px;
  margin-top: 3rem;
  padding: 3rem 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  a {
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
    padding: 1.5rem 3rem;
    border-radius: 5px;
    font-weight: 500;
    min-width: 21rem;
  }
`

export const Content = styled.div`
  max-width: 70rem;
  h2 {
    font-size: 4.3rem;
    margin-bottom: 2rem;

    @media (max-width: 480px) {
      font-size: 3rem;
    }
  }

  span {
    font-size: 1.7rem;
    color: ${props => props.theme.colors.text};
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
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 200ms;
    overflow: hidden;

    &:hover {
      border-color: ${props => props.theme.colors.primary};
    }

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
        cursor: pointer;

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

    .specialties {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      gap: 1rem;
      max-height: 8rem;

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

export const FoundProfessionals = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 2rem;

  animation: ${move} 1s;

  @media (max-width: 660px) {
    justify-content: center;
    text-align: center;
  }

  > div {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 1.8rem;
      span {
        color: ${props => props.theme.colors.primary};
        text-decoration: underline;
        font-weight: 500;
        margin: 0 0.3rem;
      }
    }

    > span {
      font-size: 1.7rem;
    }
  }
`
