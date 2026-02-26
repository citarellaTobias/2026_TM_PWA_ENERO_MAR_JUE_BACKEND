import { channelRepository } from "../repository/channel.repository.js"

class ChannelController {
    async getAllByWorkspaceId(request, response) {
        const { workspace_id } = request.params
        const channels = await channelRepository.getAllByWorkspaceId(workspace_id)
        response.json(
            {
                status: 200,
                ok: true,
                message: 'Canales obtenidos con exito',
                data: {
                    channels
                }
            }
        )
    }

    async create(request, response) {
        const { name } = request.body
        const { workspace_id } = request.params

        //Pueden validar el nombre

        const channel_created = await channelRepository.create(workspace_id, name)
        response.json(
            {
                status: 201,
                ok: true,
                message: 'Canal creado con exito',
                data: {
                    channel_created
                }
            }
        )
    }

  async updateChannelName(request, response) {
    const { name } = request.body
    const { workspace_id, channel_id } = request.params

    const updated_name = await channelRepository.updateChannelName(workspace_id, channel_id, name)
    response.json({
        status: 200,
        ok: true,
        message: 'Canal actualizado con exito',
        data: { updated_name }
    })
}


    async deleteChannel(request, response) {  
              const { workspace_id, channel_id } = request.params
        await channelRepository.deleteChannel(workspace_id, channel_id)
        response.json(
            {
                status: 200,
                ok: true,
                message: 'Canal eliminado con exito',
            }
        )
    }

}

const channelController = new ChannelController()
export  {channelController}