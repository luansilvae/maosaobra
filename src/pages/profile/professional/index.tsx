import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import Router from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import { mutate as mutateGlobal } from 'swr'
import { useSession } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { TiWarning, TiWarningOutline } from 'react-icons/ti'
import { RiArrowRightSLine } from 'react-icons/ri'

import Loading from '../../../components/Loading'
import NotLoggedPage from '../../../components/NotLoggedPage'
import { useFetch, User } from '../../../hooks/useFetch'
import { notify } from '../../../utils/notify'
import { cpfMask } from '../../../utils/masks'

import 'react-toastify/dist/ReactToastify.css'
import Container, { InputGroup } from './styles'
import { listaEspecialidades } from '../../../utils/especialidades'
import CustomSelect from '../../../components/CustomSelect'
import Unauthorized from '../../../components/Unauthorized'
import Link from 'next/link'

const Professional = ({ id = 'modal-container' }) => {
  const [session, loading] = useSession()

  const { data, mutate } = useFetch(`/api/user/${session?.user.email}`)

  const [professionalData, setProfessionalData] = useState({
    especialidades: [],
    description: '',
    experience: '',
    cpf: '',
    email: session?.user.email
  })

  const validateProfessional = Yup.object({
    description: Yup.string()
      .required('Por favor, descreva seus serviços.')
      .max(400, 'Descrição deve ter no máximo 400 caracteres.'),
    experience: Yup.number().required(
      'Por favor, preencha seus anos de experiência.'
    ),
    cpf: Yup.string()
      .required('Por favor, preencha com seu CPF.')
      .min(14, 'Formato inválido de CPF.')
      .max(14, 'Formato inválido de CPF.'),
    especialidades: Yup.array()
      .min(1, 'Selecione pelo menos uma especialidade.')
      .required('Por favor, selecione uma especialidade.')
  })

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const deleteProfessional = useCallback(() => {
    const deletedProfessional = {
      especialidades: [],
      description: '',
      experience: '',
      cpf: '',
      email: session?.user.email
    }

    if (data.professional) {
      setProfessionalData(deletedProfessional)

      axios.put(`/api/deleteProfessional`, deletedProfessional)

      const updatedUser = {
        ...data,
        professional: false,
        deletedProfessional
      }

      mutateGlobal(`/api/user/${session?.user.email}`, updatedUser)
      mutate(updatedUser, false)

      Router.back()
    }
  }, [mutate, data])

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) setModalIsOpen(false)
  }

  const handleInputMask = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name } = e.currentTarget
      if (name === 'cpf') {
        cpfMask(e)
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

          {data &&
            (!data.phone ||
            !data.address.cep ||
            !data.address.city ||
            !data.address.neighborhood ||
            !data.address.state ? (
              <Unauthorized />
            ) : (
              <Container>
                <div className="header-profile">
                  <Link href="/profile">
                    <h1>
                      <FaUser size={28} /> Meu Perfil
                    </h1>
                  </Link>
                  <h2>
                    <RiArrowRightSLine size={28} />
                    Cadastro Profissional
                  </h2>
                </div>
                <div className="form-container">
                  <div className="form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={professionalData}
                      validationSchema={validateProfessional}
                      onSubmit={values => {
                        const {
                          cpf,
                          description,
                          email,
                          especialidades,
                          experience
                        } = values

                        const especialidadesSearchable = []

                        values.especialidades.forEach(item => {
                          especialidadesSearchable.push(
                            item
                              .normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')
                          )
                        })

                        const updateProfessional = {
                          cpf,
                          description,
                          email,
                          especialidades,
                          experience,
                          especialidadesSearchable
                        }

                        const updatedData: User = {
                          ...data,
                          cpf: String(cpf),
                          description,
                          especialidades,
                          experience: Number(experience),
                          especialidadesSearchable,
                          professional: true,
                          email,
                        }

                        axios.put(`/api/professionals`, updateProfessional)

                        mutate(updatedData, false)

                        notify('Cadastro profissional atualizado.', '#1dbf73')
                      }}
                    >
                      {formik => {
                        const { errors, touched, isValid } = formik
                        useEffect(() => {
                          axios
                            .get(`/api/user/${session?.user.email}`)
                            .then(response => {
                              const {
                                description,
                                experience,
                                cpf,
                                especialidades
                              } = response.data

                              const initialValues = {
                                especialidades: [],
                                description: '',
                                experience: '',
                                cpf: '',
                                email: session?.user.email
                              }

                              if (!data.especialidades) {
                                setProfessionalData(initialValues)
                              } else {
                                setProfessionalData({
                                  especialidades,
                                  description,
                                  experience,
                                  cpf,
                                  email: session?.user.email
                                })
                              }
                            })
                        }, [session?.user.email])

                        return (
                          <Form>
                            <h3>
                              <MdWork size={20} /> Cadastro de profissional
                            </h3>
                            <InputGroup>
                              <div
                                className={
                                  errors.especialidades &&
                                  touched.especialidades
                                    ? 'error input'
                                    : 'input'
                                }
                              >
                                <label htmlFor="especialidades">
                                  Especialidades
                                </label>

                                <Field
                                  name="especialidades"
                                  className="custom-select"
                                  options={listaEspecialidades}
                                  component={CustomSelect}
                                  instanceId="especialidades"
                                  placeholder="Selecione suas especialidades"
                                  isMulti={true}
                                />
                                {errors.especialidades &&
                                touched.especialidades ? (
                                  <div className="error-message">
                                    <TiWarning size={21} />
                                    {errors.especialidades}
                                  </div>
                                ) : null}
                              </div>

                              <div className="flex">
                                <div
                                  className={
                                    errors.experience && touched.experience
                                      ? 'error input'
                                      : 'input'
                                  }
                                >
                                  <label htmlFor="experience">
                                    Anos de experiência
                                  </label>
                                  <Field
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    min="1"
                                    max="70"
                                  />
                                  {errors.experience && touched.experience ? (
                                    <div className="error-message">
                                      <TiWarning size={21} />
                                      {errors.experience}
                                    </div>
                                  ) : null}
                                </div>

                                <div
                                  className={
                                    errors.cpf && touched.cpf
                                      ? 'error input'
                                      : 'input'
                                  }
                                >
                                  <label htmlFor="cpf">CPF</label>
                                  <Field
                                    id="cpf"
                                    name="cpf"
                                    onKeyUp={handleInputMask}
                                  />

                                  {errors.cpf && touched.cpf ? (
                                    <div className="error-message">
                                      <TiWarning size={21} />
                                      {errors.cpf}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              <div
                                className={
                                  errors.description && touched.description
                                    ? 'error input'
                                    : 'input'
                                }
                              >
                                <label htmlFor="description">Descrição</label>
                                <Field
                                  as="textarea"
                                  rows="3"
                                  id="description"
                                  name="description"
                                />
                                {errors.description && touched.description ? (
                                  <div className="error-message">
                                    <TiWarning size={21} />
                                    {errors.description}
                                  </div>
                                ) : null}
                              </div>
                            </InputGroup>

                            <div className="submit-professional">
                              {data.professional ? (
                                <span
                                  className="delete-button"
                                  onClick={() => setModalIsOpen(true)}
                                >
                                  Excluir perfil profissional
                                </span>
                              ) : (
                                <span></span>
                              )}

                              <button type="submit" disabled={!isValid}>
                                Salvar
                              </button>
                            </div>
                          </Form>
                        )
                      }}
                    </Formik>
                  </div>
                </div>

                <div
                  className={
                    modalIsOpen ? 'modal-container' : 'hidden-container'
                  }
                  id={id}
                  onClick={handleOutsideClick}
                >
                  <div className="modal">
                    <div className="modal-content">
                      <span>
                        <TiWarningOutline size={25} />
                      </span>
                      <div className="modal-text">
                        <h3>Excluir perfil</h3>
                        <p>
                          Tem certeza que quer excluir seu perfil profissional?
                        </p>
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button
                        className="btn-cancel"
                        onClick={() => setModalIsOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={deleteProfessional}
                      >
                        Excluir
                      </button>
                    </div>
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
            ))}
        </div>
      ) : (
        <NotLoggedPage />
      )}
    </div>
  )
}

export default Professional
