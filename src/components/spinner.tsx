// http://localhost:3000/spinner

import * as React from 'react'

function Spinner() {
  return (
    <div className="lds-ripple" aria-label="loading...">
      loading...
    </div>
  )
}

export default Spinner
