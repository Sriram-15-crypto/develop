# Signup&Loginform

 This README provides an overview of the available endpoints for authentication and user management.

## API Endpoints

### Signup
Endpoint: `http://localhost:4008/signup`
Method: POST
Description: Register a new user.

### Login
Endpoint: `http://localhost:4008/logins`
Method: POST
Description: Authenticate a user and generate an access token.

### Forgot Password
Endpoint: `http://localhost:4008/login/FORGOTPASSWORD`
Method: POST
Description: Initiate the process to reset a forgotten password. An email will be sent with a reset token.

### Reset Password
Endpoint: `http://localhost:4008/RESETPASSWORD/${token}`
Method: POST
Description: Reset a user's password using the reset token received via email.

## Getting Started

1. Clone this repository: `git clone https://github.com/Sriram-15-crypto/Sriram-15-crypto`
2. Install dependencies: `npm install`
3. Configure your environment variables, if necessary.
4. Start the development server: `npm start`

## Contributing

Contributions are always welcome! Please fork this repository and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
