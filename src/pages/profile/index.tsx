import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { mutate as mutateGlobal } from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import * as Yup from 'yup'
import { useSession } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { FaUser, FaFileAlt, FaHandshake } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { TiWarning } from 'react-icons/ti'
import { BiLinkExternal } from 'react-icons/bi'

import Loading from '../../components/Loading'
import NotLoggedPage from '../../components/NotLoggedPage'
import { useFetch, User } from '../../hooks/useFetch'
import { notify } from '../../utils/notify'
import capitalizeString from '../../utils/capitalizeString'
import { cepMask, phoneMask } from '../../utils/masks'

import 'react-toastify/dist/ReactToastify.css'
import Container, { InputGroup } from './styles'
import Link from 'next/link'

interface UserProps {
  email: string
  name: string
  phone: string
  city: string
  neighborhood: string
  state: string
  cep: string | boolean
}

const Profile = () => {
  const [session, loading] = useSession()

  const { data, mutate } = useFetch(`/api/user/${session?.user.email}`)

  const [userData, setUserData] = useState<UserProps>({
    name: '',
    email: session?.user.email,
    phone: '',
    city: '',
    neighborhood: '',
    state: '',
    cep: ''
  })

  const validateUser = Yup.object({
    name: Yup.string().required('Por favor, preencha com seu nome.'),
    email: Yup.string()
      .email('Email inválido.')
      .required('Email é obrigatório.'),
    phone: Yup.string()
      .required('Por favor, preencha com seu telefone de contato.')
      .min(15, 'Número de telefone inválido.')
      .max(15, 'Número de telefone inválido.'),
    city: Yup.string()
      .required('Por favor, preencha com sua cidade.')
      .max(20, 'Cidade aceita no máximo 20 caracteres.'),
    neighborhood: Yup.string()
      .required('Por favor, preencha o bairro.')
      .max(20, 'Bairro aceita no máximo 20 caracteres.'),
    state: Yup.string()
      .required('Por favor, preencha o estado.')
      .max(2, 'Preencha o estado com a sigla de 2 caracteres.')
      .min(2, 'Preencha o estado com a sigla de 2 caracteres.'),
    cep: Yup.string()
      .required('Por favor, preencha o CEP.')
      .max(9, 'Formato inválido')
      .min(9, 'Formato inválido')
  })

  const handleInputMask = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name } = e.currentTarget

      if (name === 'phone') {
        phoneMask(e)
      }

      if (name === 'cep') {
        cepMask(e)
      }
    },
    []
  )

  return (
    <div>
      {session ? (
        <div>
          <Head>
            <title>Mãos à Obra | Perfil</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />
          </Head>

          {!data || (loading && <Loading />)}

          {data && (
            <Container>
              <div className="header-profile">
                <h1>
                  <FaUser size={28} /> Meu Perfil
                </h1>
              </div>
              <div className="form-container">
                <div className="form">
                  <Formik
                    enableReinitialize={true}
                    initialValues={userData}
                    validationSchema={validateUser}
                    onSubmit={values => {
                      const updateUser = {
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        address: {
                          city: values.city,
                          neighborhood: values.neighborhood,
                          state: values.state,
                          cep: values.cep,
                          citySearchable: values.city
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                        }
                      }

                      const updatedData: User = {
                        ...data,
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        address: {
                          city: values.city,
                          neighborhood: values.neighborhood,
                          state: values.state,
                          cep: String(values.cep),
                          citySearchable: values.city
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                        }
                      }

                      axios.put(`/api/user`, updateUser)

                      mutateGlobal(
                        `/api/user/${session?.user.email}`,
                        updatedData
                      )
                      mutate(updatedData, false)

                      notify('Dados de usuários atualizados', '#1dbf73')
                    }}
                  >
                    {formik => {
                      const { errors, touched, isValid } = formik

                      const handleCEP = async (
                        currentCep: FormEvent<HTMLFormElement>
                      ) => {
                        if (!currentCep) {
                          formik.setTouched({ cep: true }, true)
                          formik.setErrors({
                            cep: 'Por favor preencha seu CEP.'
                          })
                        } else {
                          formik.setTouched({ cep: true }, true)

                          if (!errors.cep) {
                            const validCep = await axios.get(
                              `https://viacep.com.br/ws/${currentCep}/json/`
                            )

                            const { localidade, bairro, uf, cep, erro } =
                              validCep.data

                            if (erro) {
                              notify('CEP inválido.', '#d83024')

                              setUserData(userData => ({
                                ...userData,
                                phone: formik.values.phone,
                                city: '',
                                neighborhood: '',
                                state: '',
                                cep: formik.values.cep
                              }))
                            }

                            setUserData(userData => ({
                              ...userData,
                              phone: formik.values.phone,
                              city: localidade,
                              neighborhood: bairro,
                              state: uf,
                              cep
                            }))
                          }
                        }
                      }

                      useEffect(() => {
                        axios
                          .get(`/api/user/${session?.user.email}`)
                          .then(response => {
                            const { name, email, phone, address } =
                              response.data

                            let city: string
                            let state: string
                            let neighborhood: string
                            let cep: string

                            if (address) {
                              city = address.city
                              state = address.state
                              neighborhood = address.neighborhood
                              cep = address.cep
                            }

                            setUserData({
                              name: capitalizeString(name),
                              email,
                              phone,
                              city,
                              neighborhood,
                              state,
                              cep
                            })
                          })
                      }, [session?.user.email])

                      return (
                        <Form>
                          <h3 className="title-basic-data">
                            <FaFileAlt size={20} />
                            Dados de usuário
                          </h3>
                          <InputGroup>
                            <div className="input">
                              <label htmlFor="email">Email</label>
                              <Field id="email" name="email" disabled />
                            </div>

                            <div
                              className={
                                errors.name && touched.name
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="name">Nome</label>
                              <Field id="name" name="name" />
                              {errors.name && touched.name ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>

                            <div
                              className={
                                errors.phone && touched.phone
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="phone">Telefone</label>
                              <Field
                                name="phone"
                                id="phone"
                                onKeyUp={handleInputMask}
                              />

                              {errors.phone && touched.phone ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.phone}
                                </div>
                              ) : null}
                            </div>
                          </InputGroup>

                          <h3 className="title-address">
                            <MdLocationOn size={20} /> Endereço
                          </h3>

                          <InputGroup>
                            <div
                              className={
                                errors.cep && touched.cep
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="city">CEP</label>
                              <Field
                                id="cep"
                                name="cep"
                                onKeyUp={handleInputMask}
                                onBlur={(event: {
                                  target: {
                                    value: React.FormEvent<HTMLFormElement>
                                  }
                                }) => {
                                  handleCEP(event.target.value)
                                }}
                              />
                              {errors.cep && touched.cep ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.cep}
                                </div>
                              ) : null}
                            </div>

                            <div
                              className={
                                errors.neighborhood && touched.neighborhood
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="neighborhood">Bairro</label>
                              <Field id="neighborhood" name="neighborhood" />

                              {errors.neighborhood && touched.neighborhood ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.neighborhood}
                                </div>
                              ) : null}
                            </div>

                            <div
                              className={
                                errors.city && touched.city
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="city">Cidade</label>
                              <Field id="city" name="city" disabled />
                              {errors.city && touched.city ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.city}
                                </div>
                              ) : null}
                            </div>

                            <div
                              className={
                                errors.state && touched.state
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="state">Estado</label>
                              <Field id="state" name="state" disabled />
                              {errors.state && touched.state ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.state}
                                </div>
                              ) : null}
                            </div>
                          </InputGroup>
                          <div className="submit-user">
                            <button type="submit" disabled={!isValid}>
                              Salvar
                            </button>
                          </div>
                        </Form>
                      )
                    }}
                  </Formik>
                </div>

                <div className="cards-container">
                  {!data.professional ? (
                    <div className="card professional-card">
                      <FaHandshake size={90} />
                      <span>
                        Se torne um parceiro e ofereça os seus serviços na
                        plataforma.
                      </span>

                      {!data.phone ||
                      !data.address.city ||
                      !data.address.neighborhood ||
                      !data.address.state ? (
                        <button
                          onClick={() =>
                            notify('Finalize os dados de usuário.', '#d83024')
                          }
                        >
                          Cadastro Profissional
                        </button>
                      ) : (
                        <Link href="/profile/professional">
                          <button>Cadastro Profissional</button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="card professional-card">
                      <h3>Estes são os serviços que você presta atualmente.</h3>

                      <div className="specialties">
                        {data.especialidades &&
                          data.especialidades.map(item => (
                            <span key={item}>{item}</span>
                          ))}
                      </div>

                      <Link href="/profile/professional">
                        <button>Editar Cadastro</button>
                      </Link>
                    </div>
                  )}

                  {data.favorites?.length > 0 && (
                    <div className="card favorites-card">
                      <h3>Seus profissionais favoritos</h3>
                      <div className="favorites-content">
                        <ul>
                          {data.favorites?.map(favorite => (
                            <Link
                              href={`/professional/${favorite.professionalId}`}
                            >
                              <li>
                                <div className="favorite-info">
                                  <Image
                                    src={favorite.professionalImage}
                                    width={360}
                                    height={360}
                                    alt="User Avatar"
                                  />

                                  <span>{favorite.professionalName}</span>
                                </div>
                                <BiLinkExternal size={23} />
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Container>
          )}
        </div>
      ) : (
        <NotLoggedPage />
      )}
    </div>
  )
}

export default Profile
