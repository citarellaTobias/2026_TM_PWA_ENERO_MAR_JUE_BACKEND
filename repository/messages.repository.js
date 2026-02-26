import ChannelMessages from "../models/ChannelMessages.model.js"
import message from "../models/ChannelMessages.model.js"
class MessagesRepository{
    async create(member_id, content, channel_id){
        return await ChannelMessages.create({
            fk_id_workspace_member: member_id,
            message: content,
            fk_id_workspace_channel: channel_id
        })
    }
    async getAllByChannelId(channel_id){
        const messages = await ChannelMessages.find({fk_id_workspace_channel: channel_id})
        .populate(
            {
                path: 'fk_id_workspace_member',
                select: 'role fk_id_user',
                populate: {
                    path: 'fk_id_user',
                    select: 'username email'
                }
            }
        )
        return messages
    }
async softDelete(channel_id, message_id, member_id, member_role) {
    const filter = {
        fk_id_workspace_channel: channel_id,
        _id: message_id
    }

    if (!['Owner', 'Admin'].includes(member_role)) {
        filter.fk_id_workspace_member = member_id
    }

    const result = await message.findOneAndUpdate(
        filter,
        { $set: { isDeleted: true, deleted_at: new Date() } },
        { new: true }
    ).populate(
        {
            path: 'fk_id_workspace_member',
            select: 'role fk_id_user',
            populate: {
                path: 'fk_id_user',
                select: 'username email'
            }
        }
    )
    return result
}
}

const messagesRepository = new MessagesRepository()
export default messagesRepository