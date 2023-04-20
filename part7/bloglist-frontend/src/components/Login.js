import { Button, Card } from 'antd'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleCancel,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <Card
      actions={[
        <Button key="login" type="primary" id="btn-login" onClick={handleSubmit}>Login</Button>,
        <Button key="cancel" type="default" onClick={handleCancel}>Cancel</Button>
      ]}
    >
      <h2>Login</h2>

      <form>
        <div className='login-form-fld'>
          Username:
          <input
            type="text"
            placeholder='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className='login-form-fld'>
          Password:
          <input
            type="password"
            placeholder='********'
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
      </form>
    </Card>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
