import mongoose from "mongoose";

const memberWorkspaceSchema = new mongoose.Schema(
    {
        fk_id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        fk_id_workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String, 
            enum: ['Owner', 'Admin', 'Member'],
            default: 'User',
            required: true
        }
    }
)

// Middleware para popular automáticamente el usuario en las consultas
memberWorkspaceSchema.pre(/^find/, function() {
    this.populate('fk_id_user', 'name email username');
});

const MemberWorkspace = mongoose.model('MemberWorkspace', memberWorkspaceSchema)

export default MemberWorkspace