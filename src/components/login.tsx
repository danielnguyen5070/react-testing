import * as React from 'react'

type LoginFormProps = {
  onSubmit: (credentials: { username: string; password: string }) => void;
};

function Login({ onSubmit }: LoginFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const { username, password } = form.elements as typeof form.elements & {
      username: HTMLInputElement
      password: HTMLInputElement
    }

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <div className='min-h-screen bg-gray-100 text-gray-800 rounded'>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto p-6"
      >
        <div>
          <label
            htmlFor="username-field"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username-field"
            name="username"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password-field"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password-field"
            name="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
