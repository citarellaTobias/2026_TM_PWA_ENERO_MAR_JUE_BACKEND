import userRepository from "../repository/user.repository.js"
import ENVIRONMENT from "../config/environment.config.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mail_transporter from "../config/mail.config.js"
import ServerError from "../helpers/error.helpers.js"
class AuthController {
    async register (request, response) {
        try{
            const {email, password, username} = request.body
            if(!email || !password || !username){
                throw new ServerError('Error: Nombre, email o usuario invalido')
            }

            const user = await userRepository.buscarUnoPorEmail(email)

            if(user){
                throw new ServerError('El mail ya esta registrado', 400)
            }
            let hashed_password = await bcrypt.hash(password, 10)
            await userRepository.crear(email, hashed_password, username)

            const verification_email_token = jwt.sign(
                {
                    email: email, //guardamos el email del usuario que se quiere registrar
                },
                ENVIRONMENT.JWT_SECRET_KEY
                /* {
                    expiresIn: '7d'
                } */
            )

            await mail_transporter.sendMail(
                {
                    from: ENVIRONMENT.GMAIL_USERNAME,
                    to: email,
                    subject: 'Verifica tu mail',
                    html: `
                    <h1>Bienvenido ${username}</h1>
                    <p>Necesitamos que verifique su email</p>
                    <p>Haz click en "verificar" para verificar el mail</p>
                    <a href='http://localhost:8080/api/auth/verify-email?verification_email_token=${verification_email_token}'>Verificar</a>
                    <span>Si desconoces este registro desestima este mail</span>`
                }
            )


            return response.json({ 
                message: 'Usuario creado exitosamente' ,
                status: 201,
                ok: true,
                data: null
            }
            )
        }
        catch(error){
            /* Si tiene status decimos que es un error controlado (o sea es esperable)*/
            if(error.status){
                return response.json(
                    {
                        status: error.status,
                        ok: false,
                        message: error.message,
                        data: null
                    }
                )
            }
        
            return response.json(
                {
                    ok: false,
                    status: 500,
                    message: "Error interno del servidor",
                    data: null
                }
            )
        }
    }
    async login (request, response){
        try{
            const {email, password} = request.body
            /*
            Aplicar validaciones sobre el mail y la password 
            */
            if(!email){
                throw new ServerError('Debes enviar un email', 400)
            }
            else if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))){
                throw new ServerError('El email no es valido', 400)
            }

            const usuario_encontrado = await userRepository.buscarUnoPorEmail(email)

            if(!usuario_encontrado){
                throw new ServerError('Credenciales invalidas', 401)
            }

            if(!(await bcrypt.compare(password, usuario_encontrado.password))){
                /* Respondemos igual a que si no existe para mayor seguridad */
                throw new ServerError('Credenciales invalidas', 401)
            }

            if(!usuario_encontrado.email_verified){
                throw new ServerError('Usuario con email no verificado', 401)
            }

            const datos_del_token = {
                username: usuario_encontrado.username,
                email: usuario_encontrado.email,
                id: usuario_encontrado.id
            }

            const auth_token = jwt.sign(datos_del_token, ENVIRONMENT.JWT_SECRET_KEY)
            return response.json({
                massege: 'Inicio de sesion exitoso',
                ok: true,
                status: 200,
                data: {
                    auth_token: auth_token
                }
            })
        }
        catch(error){
            /* Si tiene status decimos que es un error controlado (o sea es esperable)*/
            if(error.status){
                return response.json(
                    {
                        status: error.status,
                        ok: false,
                        message: error.message,
                        data: null
                    }
                )
            }
        
            return response.json(
                {
                    ok: false,
                    status: 500,
                    message: "Error interno del servidor",
                    data: null
                }
            )
        }
    }

    async verifyEmail (request, response){
        try{
            const {verification_email_token} = request.query

            if(!verification_email_token){
                throw new ServerError('Debes enviar el token de verificacion', 400)
            }

            const { email } = jwt.verify(
                verification_email_token,
                ENVIRONMENT.JWT_SECRET_KEY
            )



            const user_found = await userRepository.buscarUnoPorEmail(email)

            if(!user_found){
                throw new ServerError('No existe usuario con ese mail, prueba volver a registrarte', 404)
            }

            if(user_found.email_verified){
                throw new ServerError('Usuario ya verificado', 400)
            }

            await userRepository.actualizarPorId(
                user_found._id, 
                {
                    email_verified: true
                }
            )
            /* return response.json(
                {
                    ok: true,
                    status: 200,
                    message: "Usuario verificado",
                    data: null
                }
            ) */

            /*
            Redireccionar al frontend
            */
            return response.redirect(
                ENVIRONMENT.URL_FRONTEND + 'login?from=email-validated' //La querystring from=email-validated es opcional
            ) 
            
        }
        catch(error){
            if(error instanceof jwt.JsonWebTokenError){
                return response.json(
                    {
                        ok: false,
                        status: 401,
                        message: "No autorizado",
                        data: null
                    }
                )
            }
        
            /* Si tiene status decimos que es un error controlado (o sea es esperable)*/
            if(error.status){
                return response.json(
                    {
                        status: error.status,
                        ok: false,
                        message: error.message,
                        data: null
                    }
                )
            }
        
            return response.json(
                {
                    ok: false,
                    status: 500,
                    message: "Error interno del servidor",
                    data: null
                }
            )
        }
    }
}

const authController = new AuthController()
export default authController