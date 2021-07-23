import React, { FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router'
import MultiSelect from 'react-multi-select-component'
import InputMask from 'react-input-mask'
import * as yup from 'yup'
import { useSession } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import Modal from 'react-modal'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'

import Loading from '../../components/Loading'
import NotLoggedPage from '../../components/NotLoggedPage'
import capitalizeString from '../../utils/capitalizeString'
import { useFetch } from '../../hooks/useFetch'
import { notify } from '../../utils/notify'
import { listaEspecialidades } from '../../utils/especialidades'
import { estados } from '../../utils/estados'
import 'react-toastify/dist/ReactToastify.css'
import 'react-accessible-accordion/dist/fancy-example.css'

import Container, {
  ProfessionalFormContainer,
  SubmitDiv,
  InputGroup,
  UserFormContainer,
  ModalItem
} from './styles'

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

const Profile: React.FC = () => {
  const [session, loading] = useSession()

  const { data } = useFetch(`/api/user/${session?.user.email}`)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState(0)
  const [cnpj, setCnpj] = useState('')
  const [especialidades, setEspecialidades] = useState([])

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  useEffect(() => {
    axios.get(`/api/user/${session?.user.email}`).then(response => {
      const {
        name,
        phone,
        state,
        city,
        neighborhood,
        description,
        experience,
        cnpj
      } = response.data

      setName(name)
      setPhone(phone)
      setState(state)
      setCity(city)
      setNeighborhood(neighborhood)
      setDescription(description)
      setExperience(experience)
      setCnpj(cnpj)
    })
  }, [session?.user.email])

  const handleUserSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email().required('E-mail é obrigatório'),
      phone: yup.string().required('Telefone é obrigatório').max(15),
      state: yup
        .string()
        .required('Estado é obrigatório')
        .max(2, 'Estado aceita no máximo 2 caracteres'),
      city: yup
        .string()
        .required('Cidade é obrigatório')
        .max(20, 'Cidade aceita no máximo 20 caracteres'),
      neighborhood: yup
        .string()
        .required('Bairro é obrigatório')
        .max(20, 'Bairro aceita no máximo 20 caracteres')
    })

    const capitalizedName = capitalizeString(name)

    const userData = {
      name: capitalizedName,
      email: session?.user.email,
      phone,
      state,
      city,
      neighborhood
    }

    schema
      .validate(userData, { abortEarly: false })
      .then(valid => {
        notify('Dados de usuários atualizados', '#1dbf73')
        axios.put(`/api/user`, valid)
      })
      .catch(err => {
        const errors = err.errors

        for (let index = 0; index < errors.length; index++) {
          const element = errors[index]

          notify(element, '#d83024')
        }
      })
  }

  const handleProfessionalSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const schema = yup.object().shape({
      description: yup
        .string()
        .required('Descrição é obrigatório')
        .max(250, 'Descrição deve ter no máximo 250 caracteres'),
      experience: yup.string().required('Experiência é obrigatório'),
      email: yup.string().email().required('E-mail é obrigatório'),
      cnpj: yup.string().required('CNPJ é obrigatório').max(18),
      especialidades: yup
        .array()
        .min(1, 'Especialidade é obrigatório.')
        .required('Especialidade é obrigatório.')
    })

    const professionalData = {
      email: session?.user.email,
      description,
      experience,
      cnpj,
      especialidades: especialidades.map(especialidade => especialidade.value)
    }

    if (!data.phone || !data.city || !data.neighborhood || !data.state) {
      notify('Finalize os dados de usuário', '#d83024')
    } else {
      schema
        .validate(professionalData, { abortEarly: false })
        .then(valid => {
          notify('Dados profissionais atualizados', '#1dbf73')
          axios.put(`/api/professionals`, valid)
        })
        .catch(err => {
          const errors = err.errors

          for (let index = 0; index < errors.length; index++) {
            const element = errors[index]

            notify(element, '#d83024')
          }
        })
    }
  }

  const deleteProfessional = async () => {
    const professionalData = {
      email: session?.user.email,
      description: '',
      experience: '',
      cnpj: '',
      especialidades: []
    }

    if (data.professional) {
      await axios.put(`/api/deleteProfessional`, professionalData)

      setDescription('')
      setExperience(0)
      setCnpj('')
      setEspecialidades([])

      Router.reload()
    } else {
      notify('Finalize os dados de profissional', '#d83024')
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
              <Accordion
                allowMultipleExpanded
                allowZeroExpanded
                preExpanded={['user']}
                className="forms-container"
              >
                <AccordionItem uuid="user">
                  <AccordionItemHeading>
                    <AccordionItemButton
                      style={{
                        fontWeight: 500,
                        fontSize: '1.8rem',
                        padding: '2.5rem 2rem',
                        borderRadius: '5px 5px 0 0',
                        background: '#f5f7f6'
                      }}
                    >
                      Dados de usuário
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <UserFormContainer>
                      <div className="user-data-content">
                        <img src={data.image} alt="User Avatar" />
                        <div className="user-info">
                          <h1>{data.name}</h1>

                          {data.state && data.city && data.neighborhood && (
                            <span>
                              {data.state}, {data.city} - {data.neighborhood}
                            </span>
                          )}
                        </div>
                      </div>

                      <form onSubmit={handleUserSubmit} className="user-form">
                        <InputGroup>
                          <div className="input">
                            <label>Email</label>
                            <input
                              type="text"
                              defaultValue={data.email}
                              disabled
                            />
                          </div>

                          <div className="input">
                            <label>Nome</label>
                            <input
                              type="text"
                              defaultValue={data.name}
                              onChange={event => {
                                setName(event.target.value)
                              }}
                            />
                          </div>

                          <div className="input">
                            <label>Telefone</label>
                            <InputMask
                              mask="(99) 99999-9999"
                              type="text"
                              defaultValue={data.phone}
                              onChange={(event: {
                                target: { value: React.SetStateAction<string> }
                              }) => {
                                setPhone(event.target.value)
                              }}
                            />
                          </div>

                          <div className="input">
                            <label>Cidade</label>
                            <input
                              type="text"
                              defaultValue={data.city}
                              onChange={event => {
                                setCity(event.target.value)
                              }}
                            />
                          </div>

                          <div className="input">
                            <label>Bairro</label>
                            <input
                              type="text"
                              defaultValue={data.neighborhood}
                              onChange={event => {
                                setNeighborhood(event.target.value)
                              }}
                            />
                          </div>

                          <div className="input">
                            <label>Estado</label>
                            <select
                              onChange={event => {
                                setState(event.target.value)
                              }}
                            >
                              {!data.state ? (
                                <option style={{ display: 'none' }} value="">
                                  Selecione um estado
                                </option>
                              ) : (
                                <option
                                  style={{ display: 'none' }}
                                  value={data.state}
                                >
                                  {data.state}
                                </option>
                              )}

                              {estados.map(estado => (
                                <option value={estado.sigla} key={estado.sigla}>
                                  {estado.sigla}
                                </option>
                              ))}
                            </select>
                          </div>
                        </InputGroup>
                        <SubmitDiv>
                          <button type="submit">Salvar</button>
                        </SubmitDiv>
                      </form>
                    </UserFormContainer>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>

              <Accordion allowZeroExpanded className="forms-container">
                <AccordionItem uuid="professional">
                  <AccordionItemHeading>
                    <AccordionItemButton
                      style={{
                        fontWeight: 500,
                        fontSize: '1.8rem',
                        padding: '2.5rem 2rem',
                        borderRadius: '0 0 5px 5px',
                        background: '#f5f7f6'
                      }}
                    >
                      Área profissional
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ProfessionalFormContainer>
                      <h2>Dados de profissional</h2>
                      <form
                        onSubmit={handleProfessionalSubmit}
                        className="user-form"
                      >
                        <InputGroup>
                          <div className="select-group">
                            <label>Especialidade</label>
                            <MultiSelect
                              options={listaEspecialidades}
                              value={especialidades}
                              onChange={setEspecialidades}
                              labelledBy="Especialidades"
                              className="select"
                            />

                            {data.especialidades && (
                              <div className="especialidades">
                                {data.especialidades.map(value => (
                                  <span key={value}>{value}</span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="input">
                            <label>Anos de experiência</label>
                            <input
                              type="number"
                              min={1}
                              max={70}
                              defaultValue={data.experience}
                              onChange={(event: {
                                target: { value: React.SetStateAction<string> }
                              }) => {
                                setExperience(Number(event.target.value))
                              }}
                            />
                          </div>

                          <div className="input">
                            <label>CNPJ</label>
                            <InputMask
                              mask={'99.999.999/9999-99'}
                              type="text"
                              defaultValue={data.cnpj}
                              onChange={(event: {
                                target: { value: React.SetStateAction<string> }
                              }) => {
                                setCnpj(event.target.value)
                              }}
                            />
                          </div>

                          <div className="input">
                            <label>Descrição</label>
                            <textarea
                              rows={3}
                              defaultValue={data.description}
                              onChange={event => {
                                setDescription(event.target.value.trim())
                              }}
                            ></textarea>
                          </div>
                        </InputGroup>
                        <SubmitDiv>
                          <button type="submit">Salvar</button>
                          <button type="button" onClick={openModal}>
                            Deletar
                          </button>
                        </SubmitDiv>
                      </form>
                    </ProfessionalFormContainer>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>

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
