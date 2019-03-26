import React from 'react'
import PropTypes from 'prop-types'

export const SVG = ({
  width = '100%',
  height = '100%',
  viewBox = '0 0 32 32',
  onClick = () => {},
  className = '',
  children,
}) => (
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
    {children}
  </svg>
)

SVG.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  viewBox: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}
