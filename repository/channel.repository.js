import Channel from "../models/Channels.model.js";

class ChannelRepository {
  async create(workspace_id, name) {
    return await Channel.create({ name: name, fk_id_workspace: workspace_id });
  }

  async getAllByWorkspaceId(workspace_id) {
    return await Channel.find({ fk_id_workspace: workspace_id })
  }
  async updateChannelName(workspace_id, channel_id, new_name){
    return await Channel.findOneAndUpdate(
        { _id: channel_id, fk_id_workspace: workspace_id },
        { $set: { name: new_name } },
        { new: true }
    )
}


  async getByIdAndWorkspaceId(channel_id, workspace_id) {
    return await Channel.findOne({
      _id: channel_id,
      fk_id_workspace: workspace_id,
    });
  }
}

const channelRepository = new ChannelRepository();
export { channelRepository };
