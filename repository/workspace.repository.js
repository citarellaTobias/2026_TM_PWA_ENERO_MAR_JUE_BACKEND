import MemberWorkspace from '../models/MemberWorkspace.model.js';
import Workspace from '../models/Workspace.model.js';


class WorkspaceRepository {

    async getById(workspace_id){
        return await Workspace.findById(workspace_id)
    }
async update(workspace_id, title, description, image){
    const workspace = await Workspace
    .findByIdAndUpdate(workspace_id, {
        title,
        description,
        image
    }, {new: true})
    return workspace
}

    async getWorkspacesByUserId(user_id){
        //Busco a todos los miembros que pertenezcan al usuario
        //Esto seria buscar todas mis membresias
        const workspaces = await MemberWorkspace.find({fk_id_user: user_id})
        .populate({
            path: 'fk_id_workspace',
            match: {active: true}
        }) //Esto permite expandir sobre la referencia a la tabla de espacios de trabajo

        const members_workspace = workspaces.filter( (member) => member.fk_id_workspace !== null)
        return members_workspace.map(
            (member_workspace) => {
                return {
                    member_id: member_workspace._id,
                    member_role: member_workspace.role,
                    member_id_user: member_workspace.fk_id_user,
                    workspace_image: member_workspace.fk_id_workspace.image,
                    workspace_title: member_workspace.fk_id_workspace.title,
                    workspace_id: member_workspace.fk_id_workspace._id
                }
            }
        )
    }
    async create(fk_id_owner, title, image, description){
        const workspace = await Workspace.create({
            fk_id_owner,
            title,
            image,
            description
        })
        return workspace
    }

    async addMember(workspace_id, user_id, role){
        const member = await MemberWorkspace.create({
            fk_id_workspace: workspace_id,
            fk_id_user: user_id,
            role
        })
        return member
    }

    //Obtener mimebro de un espacio de trabajo por id de espacio de trabajo y id de usuasrio
    async getMemberByWorkspaceIdAndUserId(workspace_id, user_id){
        const member = await MemberWorkspace.findOne({fk_id_workspace: workspace_id, fk_id_user: user_id})
        return member
    }
    // ...existing code...

 async acceptInvitation(workspace_id, user_id){
    const member = await MemberWorkspace.findOneAndUpdate(
        {fk_id_workspace: workspace_id, 
                fk_id_user: user_id
                        },
        {status: 'accepted'},
        {new: true}
    )
    return member
}



    async deleteMember(workspace_id, member_id){
        await MemberWorkspace.findOneAndDelete({fk_id_workspace: workspace_id, _id: member_id})
    }



async updateMemberRole(workspace_id, member_id, member_role){
    const member = await MemberWorkspace.findOneAndUpdate(
        {
            _id: member_id,
            fk_id_workspace: workspace_id
        },
        {
            role: member_role
        },
        {
            new: true // Retorna el documento actualizado
        }
    )
    return member
}
// ...existing code...
  



    async getMembersByWorkspaceId(workspace_id){
        const members = await MemberWorkspace.find({fk_id_workspace: workspace_id})
        .populate('fk_id_user', 'name email username') // Esto permite expandir sobre la referencia a la tabla de usuarios, obteniendo solo el nombre, correo electrónico y username
        return members.map(
            (member) => {
                return {
                    member_id: member._id,
                    member_role: member.role,
                    member_id_user: member.fk_id_user._id,
                    member_name_user: member.fk_id_user.name,
                    member_email_user: member.fk_id_user.email,
                    member_username_user: member.fk_id_user.username
                }
            }
        )
    }


    async delete(workspace_id){
        await Workspace.findByIdAndUpdate(workspace_id,{active: false})
    }
}

const workspaceRepository = new WorkspaceRepository()
export default workspaceRepository