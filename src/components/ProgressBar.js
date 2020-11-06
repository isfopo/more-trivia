import React from 'react'

export const ProgressBar = props => {
        const containerStyles = {
          height: 20,
          width: '80%',
          backgroundColor: "#e0e0de",
          borderRadius: 50,
          margin: 'auto'
        }
      
        const fillerStyles = {
          height: '100%',
          width: `${props.progress}%`,
          backgroundColor: '#45082d',
          borderRadius: 'inherit',
          transition: 'width 1s ease-in-out',
          textAlign: 'right'
        }
      
        return (
          <div style={containerStyles}>
            <div style={fillerStyles}></div>
          </div>
        )
}
