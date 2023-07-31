import { FC, ReactNode } from 'react'

type InputProps = {
  value?: string
  name: string
  id?: string
  type?: any
  placeholder?: string
  label?: string | ReactNode
  handler?: (e: any) => void
  importantLabel: boolean
  required: boolean
}

const Input: FC<InputProps> = ({
  value,
  name,
  handler,
  id,
  label,
  type,
  placeholder,
  required,
  importantLabel
}) => {
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={id} className='text-gray-300 leading-[22px]'>
        <span>{label}</span>
        {importantLabel && <sup className='text-orange mt-[-5px] ml-[5px]'>*</sup>}
      </label>
      <input
        required={required}
        name={name}
        id={id}
        type={type}
        onChange={handler}
        value={value}
        className='py-[12px] px-[16px] text-black-100 rounded-[8px] outline-none border border-gray-500'
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
