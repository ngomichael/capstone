import React from 'react'
import PropTypes from 'prop-types'

export const SVG = ({
  width = '100%',
  height = '100%',
  viewBox = '0 0 32 32',
  onClick = () => {},
  className = '',
  children,
}) => {
  console.log(children[0])
  console.log(children[1])
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      onClick={onClick}
    >
      {children[0]}
      {children[1]}
    </svg>
  )
}

SVG.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}
