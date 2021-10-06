import React from 'react'

export function cepMask(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function phoneMask(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '($1) $2')
  value = value.replace(/(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}

export function cnpjMask(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 18
  let value = e.currentTarget.value
  value = value.replace(/\D+/g, '')
  value = value.replace(/(\d{2})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1/$2')
  value = value.replace(/(\d{4})(\d)/, '$1-$2')
  value = value.replace(/(-\d{2})\d+?$/, '$1')
  e.currentTarget.value = value
  return e
}
