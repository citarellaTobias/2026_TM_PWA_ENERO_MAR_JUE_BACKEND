import messagesRepository from "../repository/messages.repository.js"

class MessagesController {
    async create(request, response) {
        const { content } = request.body
        const member_id = request.member._id
        const { channel_id } = request.params
        await messagesRepository.create(member_id, content, channel_id)

        return response.json(
            {
                ok: true,
                status: 201,
                message: 'Mensaje creado con exito'
                
            }
        )
    }

    async getAllByChannelId(request, response) {
        const { channel_id } = request.params
        const messages = await messagesRepository.getAllByChannelId(channel_id)
        return response.json(
            {
                ok: true,
                status: 200,
                message: 'Mensajes obtenidos con exito',
                data: {
                    messages
                }
            }
        )
    }
    async delete(request, response) {
    const { channel_id, message_id } = request.params
    const member_id = request.member._id
    await messagesRepository.delete(channel_id, message_id, member_id)
    
    return response.json(
        {
            ok: true,
            status: 200,
            message: 'Mensaje eliminado con exito'
        }
    )
}
}

const messagesController = new MessagesController()
export default messagesController