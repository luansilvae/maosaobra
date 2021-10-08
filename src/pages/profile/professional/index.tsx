import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import Router from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import { useSession } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { TiWarning, TiWarningOutline } from 'react-icons/ti'

import Loading from '../../../components/Loading'
import NotLoggedPage from '../../../components/NotLoggedPage'
import { useFetch } from '../../../hooks/useFetch'
import { notify } from '../../../utils/notify'
import { cnpjMask } from '../../../utils/masks'

import 'react-toastify/dist/ReactToastify.css'
import Container, { InputGroup } from './styles'
import { listaEspecialidades } from '../../../utils/especialidades'
import CustomSelect from '../../../components/CustomSelect'
import Unauthorized from '../../../components/Unauthorized'

const Professional = ({ id = 'modal-container' }) => {
  const [session, loading] = useSession()

  const { data } = useFetch(`/api/user/${session?.user.email}`)

  const [professionalData, setProfessionalData] = useState({
    especialidades: [],
    description: '',
    experience: '',
    cnpj: '',
    email: session?.user.email
  })

  const validateProfessional = Yup.object({
    description: Yup.string()
      .required('Por favor, descreva seus serviços.')
      .max(250, 'Descrição deve ter no máximo 250 caracteres.'),
    experience: Yup.number().required(
      'Por favor, preencha seus anos de experiência.'
    ),
    cnpj: Yup.string()
      .required('Por favor, preencha com seu CNPJ.')
      .min(18, 'CNPJ precisa ter 18 caracteres.')
      .max(18, 'CNPJ precisa ter 18 caracteres.'),
    especialidades: Yup.array()
      .min(1, 'Selecione pelo menos uma especialidade.')
      .required('Por favor, selecione uma especialidade.')
  })

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const deleteProfessional = async () => {
    const deletedProfessional = {
      especialidades: [],
      description: '',
      experience: '',
      cnpj: '',
      email: session?.user.email
    }

    if (data.professional) {
      setProfessionalData(deletedProfessional)

      await axios.put(`/api/deleteProfessional`, deletedProfessional)

      Router.back()
    }
  }

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) setModalIsOpen(false)
  }

  const handleInputMask = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { name } = e.currentTarget
      if (name === 'cnpj') {
        cnpjMask(e)
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
                  <h1>
                    <FaUser size={28} /> Cadastro profissional
                  </h1>
                </div>
                <div className="form-container">
                  <div className="form">
                    <Formik
                      enableReinitialize={true}
                      initialValues={professionalData}
                      validationSchema={validateProfessional}
                      onSubmit={values => {
                        notify('Cadastro profissional atualizado.', '#1dbf73')
                        axios.put(`/api/professionals`, values)
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
                                cnpj,
                                especialidades
                              } = response.data

                              const initialValues = {
                                especialidades: [],
                                description: '',
                                experience: '',
                                cnpj: '',
                                email: session?.user.email
                              }

                              if (!data.especialidades) {
                                setProfessionalData(initialValues)
                              } else {
                                setProfessionalData({
                                  especialidades,
                                  description,
                                  experience,
                                  cnpj,
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
                                    errors.cnpj && touched.cnpj
                                      ? 'error input'
                                      : 'input'
                                  }
                                >
                                  <label htmlFor="cnpj">CNPJ</label>
                                  <Field
                                    id="cnpj"
                                    name="cnpj"
                                    onKeyUp={handleInputMask}
                                  />

                                  {errors.cnpj && touched.cnpj ? (
                                    <div className="error-message">
                                      <TiWarning size={21} />
                                      {errors.cnpj}
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
                              ) : null}

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
