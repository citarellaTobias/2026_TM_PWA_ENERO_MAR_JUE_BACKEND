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
  async softDelete(request, response) {
    const { channel_id, message_id } = request.params
    const member_id = request.member._id
    const member_role = request.member.role

    const result = await messagesRepository.softDelete(channel_id, message_id, member_id, member_role)
    if (!result) {
        return response.status(404).json({ ok: false, status: 404, message: 'Mensaje no encontrado' })
    }

    return response.json({ ok: true, status: 200, message: 'Mensaje eliminado con exito', data: { message: result } })
}
}

const messagesController = new MessagesController()
export default messagesController