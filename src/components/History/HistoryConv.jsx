import React from 'react'

function HistoryConv({exchange}) {
  return (
    <div className='historyConv'>
    <p><strong>Vous: </strong> {exchange.prompt}</p>
    <p><strong>IA: </strong> {exchange.response}</p>
  </div>
  )
}

export default HistoryConv