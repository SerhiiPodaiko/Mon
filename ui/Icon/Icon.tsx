import React from 'react'

type IconProps = {
  svg: {
    src: string
    height: number
    width: number
  }
  width?: number
  height?: number
  className?: string
}

const Icon: React.FC<IconProps> = ({ svg, width = 24, height = 24, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      className={`fill-current ${className}`}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      dangerouslySetInnerHTML={{ __html: svg.src }}
    />
  )
}

export default Icon
