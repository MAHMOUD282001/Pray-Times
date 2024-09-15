import React from 'react'

function PrayTimes({name, time}) {
  return (
    <div className='pray-times-box'>
        <p className='pray-name'>{name}</p>
        <p className='pray-time'>{time}</p>
    </div>
  )
}

export default PrayTimes