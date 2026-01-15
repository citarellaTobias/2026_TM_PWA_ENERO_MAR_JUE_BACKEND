import mongoose from "mongoose";

const channelMessagesSchema = new mongoose.Schema(
    {
        fk_id_workspace_channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channels',
            required: true
        },
        fk_id_workspace_member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MemberWorkspace',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }
)

const ChannelMessages = mongoose.model('ChannelMessages', channelMessagesSchema)
export default ChannelMessages