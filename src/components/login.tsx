// http://localhost:3000/login
// this renders a login UI and calls the onSubmit handler with the username
// and password when the user submits the form.

import * as React from 'react'

type LoginFormProps = {
  onSubmit: (credentials: { username: string; password: string }) => void;
};
function Login({onSubmit} : LoginFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget;
    const {username, password} = form.elements as typeof form.elements & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };

    onSubmit({
      username: username.value,
      password: password.value,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username-field">Username</label>
        <input id="username-field" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="password-field">Password</label>
        <input id="password-field" name="password" type="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Login
