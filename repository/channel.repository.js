import Channel from "../models/Channels.model.js"

class ChannelRepository{
    async create(workspace_id, name){
        return await Channel.create({name: name, fk_id_workspace: workspace_id})
    }

    async getAllByWorkspaceId(workspace_id){
        return await Channel.find({fk_id_workspace: workspace_id})
    }
}

const ChannelRepository = new ChannelRepository()
export {ChannelRepository}
