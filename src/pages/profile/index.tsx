import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import Router from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import Modal from 'react-modal'
import { useSession } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { FaUser, FaFileAlt } from 'react-icons/fa'
import { MdLocationOn, MdWork } from 'react-icons/md'
import { TiWarning } from 'react-icons/ti'

import Loading from '../../components/Loading'
import NotLoggedPage from '../../components/NotLoggedPage'
import CustomSelect from '../../components/CustomSelect'

import { useFetch } from '../../hooks/useFetch'
import { notify } from '../../utils/notify'
import { listaEspecialidades } from '../../utils/especialidades'
import capitalizeString from '../../utils/capitalizeString'

import 'react-toastify/dist/ReactToastify.css'
import Container, { InputGroup, ModalItem } from './styles'

const Profile: React.FC = () => {
  const [session, loading] = useSession()

  const { data } = useFetch(`/api/user/${session?.user.email}`)

  const [userData, setUserData] = useState({
    name: '',
    email: session?.user.email,
    phone: '',
    city: '',
    neighborhood: '',
    state: ''
  })

  const [professionalData, setProfessionalData] = useState({
    especialidades: [],
    description: '',
    experience: '',
    cnpj: '',
    email: session?.user.email
  })

  const validateUser = Yup.object({
    name: Yup.string().required('Por favor, preencha com seu nome.'),
    email: Yup.string()
      .email('Email inválido.')
      .required('Email é obrigatório.'),
    phone: Yup.string().required(
      'Por favor, preencha com seu telefone de contato.'
    ),
    city: Yup.string()
      .required('Por favor, preencha com sua cidade.')
      .max(20, 'Cidade aceita no máximo 20 caracteres.'),
    neighborhood: Yup.string()
      .required('Por favor, preencha o bairro.')
      .max(20, 'Bairro aceita no máximo 20 caracteres.'),
    state: Yup.string()
      .required('Por favor, preencha o estado.')
      .max(2, 'Estado aceita no máximo 2 caracteres.')
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
      .nullable()
  })

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

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

      Router.reload()
    }
  }

  return (
    <div>
      {session ? (
        <div>
          <Head>
            <title>Mãos à Obra | Perfil</title>
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
                      notify('Dados de usuários atualizados', '#1dbf73')
                      axios.put(`/api/user`, values)
                    }}
                  >
                    {formik => {
                      const { errors, touched, isValid } = formik
                      useEffect(() => {
                        axios
                          .get(`/api/user/${session?.user.email}`)
                          .then(response => {
                            const {
                              name,
                              email,
                              phone,
                              city,
                              neighborhood,
                              state
                            } = response.data

                            setUserData({
                              name: capitalizeString(name),
                              email,
                              phone,
                              city,
                              neighborhood,
                              state
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
                              <Field name="phone">
                                {({ field }) => (
                                  <InputMask
                                    {...field}
                                    mask={'(99) 99999-9999'}
                                    id="phone"
                                    type="text"
                                  />
                                )}
                              </Field>

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
                                errors.city && touched.city
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="city">Cidade</label>
                              <Field id="city" name="city" />
                              {errors.city && touched.city ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.city}
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
                                errors.state && touched.state
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="state">Estado</label>
                              <Field id="state" name="state" />
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

                <div className="form">
                  <Formik
                    enableReinitialize={true}
                    initialValues={professionalData}
                    validationSchema={validateProfessional}
                    onSubmit={values => {
                      if (
                        !data.phone ||
                        !data.city ||
                        !data.neighborhood ||
                        !data.state
                      ) {
                        notify('Finalize os dados de usuário.', '#d83024')
                      } else {
                        notify('Cadastro profissional atualizado.', '#1dbf73')
                        axios.put(`/api/professionals`, values)
                      }
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
                                errors.especialidades && touched.especialidades
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
                              <Field id="cnpj" name="cnpj">
                                {({ field }) => (
                                  <InputMask
                                    {...field}
                                    mask={'99.999.999/9999-99'}
                                    id="cnpj"
                                    type="text"
                                  />
                                )}
                              </Field>
                              {errors.cnpj && touched.cnpj ? (
                                <div className="error-message">
                                  <TiWarning size={21} />
                                  {errors.cnpj}
                                </div>
                              ) : null}
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

                            {data.professional && (
                              <span
                                className="delete-button"
                                onClick={openModal}
                              >
                                Excluir perfil profissional
                              </span>
                            )}
                          </InputGroup>

                          <div className="submit-professional">
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

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Logout"
                ariaHideApp={false}
              >
                <ModalItem>
                  <span>
                    Tem certeza que quer excluir seus dados profissionais?
                  </span>

                  <div className="actions">
                    <button onClick={deleteProfessional}>Excluir</button>
                    <button onClick={closeModal}>Cancelar</button>
                  </div>
                </ModalItem>
              </Modal>

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
