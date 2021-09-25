import { GetServerSideProps } from 'next'
import { RiErrorWarningLine } from 'react-icons/ri'

import SignIn from '../signin/index'

export default function Error({ errorCallback }) {
  return (
    <SignIn>
      {errorCallback === 'OAuthAccountNotLinked' && (
        <div className="error-signin">
          <span>
            <RiErrorWarningLine size={22} />
            Não foi possível fazer login.
          </span>
          <p>
            Este email já está vinculado à outra conta. Tente outra forma de
            login.
          </p>
        </div>
      )}
    </SignIn>
  )
}

export const getServerSideProps: GetServerSideProps = async req => {
  const errorCallback: string | string[] = req.query.error

  if (!errorCallback) {
    return {
      notFound: true
    }
  }

  return {
    props: { errorCallback }
  }
}
