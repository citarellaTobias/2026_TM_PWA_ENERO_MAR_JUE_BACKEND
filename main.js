import { connectMongoDB } from "./config/mongoDB.config.js"
import express from 'express'
import authRouter from "./routes/auth.router.js"
import cors from 'cors'
import workspaceRouter from "./routes/workspace.router.js"
import { verifyApiKeyMiddleware } from "./middlewares/apikey.middleware.js"
import { errorHandlerMiddleware } from "./middlewares/error.middleware.js"

connectMongoDB()

const app = express()

app.use(cors())
app.use(express.json())

// Rutas públicas sin API key
app.get('/', (request, response) => {
    response.json({
        ok: true,
        message: 'Servidor funcionando correctamente',
        data: null
    })
})

// Rutas de auth sin API key
app.use("/api/auth", authRouter)

// Middleware condicional de API key - excluye rutas de invitación
app.use((req, res, next) => {
    if (req.path.includes('/members/accept-invitation')) {
        return next()
    }
    verifyApiKeyMiddleware(req, res, next)
})

// Rutas de workspace (algunas protegidas, otras no)
app.use("/api/workspace", workspaceRouter)

app.use(errorHandlerMiddleware)

app.listen(
    8080,
    () => {
        console.log('Nuestra app se escucha en el puerto 8082')
    }
)