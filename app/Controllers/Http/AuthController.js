'use strict'

class AuthController {
  //localhost:3333/auth
  async authenticate({ response, request, auth }) {
    const { email, password } = request.all();  //{email: 'as', password: 'asas'} // email, pasword

    try {
      const token = await auth.attempt(email, password);

      return response.json({
        status: 'success',
        data: token
      });
    }
    catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Email ou senha incorretos.'
      });
    }




    return
  }

  async logout() {

  }

}

module.exports = AuthController
