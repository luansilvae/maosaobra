import { FieldProps } from 'formik'
import React from 'react'
import Select, { OptionsType } from 'react-select'

interface Option {
  label: string
  value: string
}

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option>
  isMulti?: boolean
  className?: string
  placeholder?: string
  instanceId?: string
}

export const CustomSelect = ({
  className,
  placeholder,
  instanceId,
  field,
  form,
  options,
  isMulti = false
}: CustomSelectProps) => {
  const onChange = (option: Option | Option[]) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    )
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value)
    } else {
      return isMulti ? [] : ('' as any)
    }
  }

  function customTheme(theme: any) {
    return {
      ...theme,
      border: '1px dotted pink',
      colors: {
        ...theme.colors,
        primary25: '#d5ffeb',
        primary: '#1DBF73'
      }
    }
  }

  return (
    <Select
      theme={customTheme}
      className={className}
      name={field.name}
      value={getValue()}
      instanceId={instanceId}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  )
}

export default CustomSelect
