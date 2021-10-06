import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import Router from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import { useSession } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import { FaUser, FaFileAlt } from 'react-icons/fa'
import { MdLocationOn, MdWork } from 'react-icons/md'
import { TiWarning, TiWarningOutline } from 'react-icons/ti'

import Loading from '../../components/Loading'
import NotLoggedPage from '../../components/NotLoggedPage'
import CustomSelect from '../../components/CustomSelect'

import { useFetch } from '../../hooks/useFetch'
import { notify } from '../../utils/notify'
import { listaEspecialidades } from '../../utils/especialidades'
import capitalizeString from '../../utils/capitalizeString'

import 'react-toastify/dist/ReactToastify.css'
import Container, { InputGroup } from './styles'

const Profile = ({ id = 'modal-container' }) => {
  const [session, loading] = useSession()

  const { data } = useFetch(`/api/user/${session?.user.email}`)

  const [userData, setUserData] = useState({
    name: '',
    email: session?.user.email,
    phone: '',
    city: '',
    neighborhood: '',
    state: '',
    cep: ''
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
      .max(2, 'Preencha o estado com a sigla de 2 caracteres.')
      .min(2, 'Preencha o estado com a sigla de 2 caracteres.'),
    cep: Yup.string()
      .required('Por favor, preencha o CEP.')
      .max(9, 'Formato inválido')
      .min(9, 'Formato inválido')
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

      Router.reload()
    }
  }

  const handleOutsideClick = (e: any) => {
    if (e.target.id === id) setModalIsOpen(false)
  }

  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 9
    let value = e.currentTarget.value
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{5})(\d)/, '$1-$2')
    e.currentTarget.value = value
  }, [])

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
                      axios.put(`/api/user`, {
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        address: {
                          city: values.city,
                          neighborhood: values.neighborhood,
                          state: values.state,
                          cep: values.cep
                        }
                      })
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
                                city: '',
                                neighborhood: '',
                                state: '',
                                cep
                              }))
                            }

                            setUserData(userData => ({
                              ...userData,
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
                                errors.cep && touched.cep
                                  ? 'error input'
                                  : 'input'
                              }
                            >
                              <label htmlFor="city">CEP</label>
                              <Field
                                id="cep"
                                name="cep"
                                onKeyUp={handleKeyUp}
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

                <div className="form">
                  <Formik
                    enableReinitialize={true}
                    initialValues={professionalData}
                    validationSchema={validateProfessional}
                    onSubmit={values => {
                      if (
                        !data.phone ||
                        !data.address.city ||
                        !data.address.neighborhood ||
                        !data.address.state
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
                                onClick={() => setModalIsOpen(true)}
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

              <div
                className={modalIsOpen ? 'modal-container' : 'hidden-container'}
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
                    <button className="btn-delete" onClick={deleteProfessional}>
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
          )}
        </div>
      ) : (
        <NotLoggedPage />
      )}
    </div>
  )
}

export default Profile
