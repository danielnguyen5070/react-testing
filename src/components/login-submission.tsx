import * as React from 'react'
import Login from './login'
import Spinner from './spinner'

type FormData = {
  username: string
  password: string
}

type FormState = {
  status: 'idle' | 'pending' | 'resolved' | 'rejected'
  responseData: null | { username: string }
  errorMessage: null | string
}

type Action =
  | { type: 'START' }
  | { type: 'RESOLVE'; responseData: { username: string } }
  | { type: 'REJECT'; error: { message: string } }

function formSubmissionReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'START':
      return { status: 'pending', responseData: null, errorMessage: null }
    case 'RESOLVE':
      return {
        status: 'resolved',
        responseData: action.responseData,
        errorMessage: null,
      }
    case 'REJECT':
      return {
        status: 'rejected',
        responseData: null,
        errorMessage: action.error.message,
      }
    default: {
      const _exhaustiveCheck: never = action
      throw new Error(`Unsupported type: ${_exhaustiveCheck}`)
    }

  }
}

function useFormSubmission({
  endpoint,
  data,
}: {
  endpoint: string
  data: FormData | null
}) {
  const [state, dispatch] = React.useReducer(formSubmissionReducer, {
    status: 'idle',
    responseData: null,
    errorMessage: null,
  })

  React.useEffect(() => {
    if (!data) return

    const controller = new AbortController()
    const signal = controller.signal

    dispatch({ type: 'START' })

    window
      .fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
        signal,
      })
      .then(async response => {
        try {
          const json = await response.json()
          if (response.ok) {
            dispatch({ type: 'RESOLVE', responseData: json })
          } else {
            dispatch({ type: 'REJECT', error: json })
          }
        } catch {
          dispatch({
            type: 'REJECT',
            error: { message: 'Invalid response from server' },
          })
        }
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          dispatch({
            type: 'REJECT',
            error: { message: error.message || 'Unknown error' },
          })
        }
      })

    return () => controller.abort()
  }, [data, endpoint])

  return state
}

function LoginSubmission() {
  const [formData, setFormData] = React.useState<FormData | null>(null)
  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: 'https://auth-provider.example.com/api/login',
    data: formData,
  })

  return (
    <>
      {status === 'resolved' ? (
        <div>
          Welcome <strong>{responseData?.username}</strong>
        </div>
      ) : (
        <Login onSubmit={(data: FormData) => setFormData(data)} />
      )}
      <div style={{ height: 200 }}>
        {status === 'pending' && <Spinner />}
        {status === 'rejected' && (
          <div role="alert" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </>
  )
}

export default LoginSubmission
