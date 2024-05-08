import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
    public async register({auth, request, response}: HttpContextContract){
        const validateData = await request.validate(RegisterValidator)
        try{
            const user = await User.create(validateData)
            const token =  await auth.login(user)
    
            return response.status(201).json({
                user,
                token,
                
            })

        } catch (err){
            return response.status(400).json({
                message: err.message,
                
            })
        }
    }

    public async login({auth, request, response}: HttpContextContract){
        const {email, password} = request.all()
        try{
            const token = await auth.attempt(email, password)
            return response.status(201).json({
                user: token.user,
                token: token.token,
                
            })
        } catch(err){
            return response.status(401).json({
                message: err.message,
                
            })
        }
    }
}
