import React from 'react'
// import SendIcon from '../../assets/send.svg'


function Next({ onClick }) {
  return (
    <button onClick={onClick} className='button' id='next'>
      {/* <img src={SendIcon} alt="Chevron Right" /> */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M18.5 4.1352L4.50005 12.2102C3.7813 12.6258 3.85317 13.6852 4.6188 14.0008L9.00005 15.8133V19.0008C9.00005 19.9446 10.1813 20.354 10.7719 19.6352L12.6688 17.329L16.6188 18.9602C17.2157 19.2071 17.8907 18.829 17.9875 18.1883L19.9875 5.15395C20.1157 4.31958 19.2188 3.71958 18.5 4.1352ZM10 19.0008V16.2258L11.7032 16.929L10 19.0008ZM17 18.0352L10.5563 15.3727L16.7907 8.00395C16.9407 7.82895 16.7 7.59145 16.525 7.74145L8.54692 14.5415L5.00005 13.079L19 5.00083L17 18.0352Z"/>
      </svg>
    </button>
  )
}

export default Next