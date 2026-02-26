import express from "express";
import workspaceController from "../controllers/workspace.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import workspaceMiddleware from "../middlewares/workspace.middleware.js";
import { channelController } from "../controllers/channel.controller.js";
import channelMiddleware from "../middlewares/channel.middleware.js";
import messagesController from "../controllers/messages.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.get("/", authMiddleware, workspaceController.getWorkspaces);
workspaceRouter.post("/", authMiddleware, workspaceController.create);

workspaceRouter.get(
  "/:workspace_id",
  authMiddleware,
  workspaceMiddleware(),
  workspaceController.getById,
);

workspaceRouter.delete(
  "/:workspace_id",
  authMiddleware,
  workspaceController.delete,
);
workspaceRouter.put(
  "/:workspace_id",
  authMiddleware,
    workspaceMiddleware(["Owner", "Admin"]),
  workspaceController.update,
);
workspaceRouter.post(
  "/:workspace_id/members",
  authMiddleware,
  workspaceMiddleware(["Owner", "Admin"]),
  workspaceController.addMemberRequest,
);

workspaceRouter.put(
  "/:workspace_id/members/:member_id/role",
  authMiddleware,
  workspaceMiddleware(["Owner", "Admin"]),
  workspaceController.updateMemberRole,
);

workspaceRouter.delete(
  "/:workspace_id/members/:member_id",
  authMiddleware,
  workspaceMiddleware(["Owner", "Admin"]),
  workspaceController.deleteMember,
);

workspaceRouter.get(
  "/:workspace_id/members",
  authMiddleware,
  workspaceMiddleware(),
  workspaceController.getMembers,
);

workspaceRouter.get(
  "/:workspace_id/members/accept-invitation",
  workspaceController.acceptInvitation,
);

workspaceRouter.get(
  "/:workspace_id/channels",
  authMiddleware,
  workspaceMiddleware(),
  channelController.getAllByWorkspaceId,
);

workspaceRouter.delete(
  "/:workspace_id/channels/:channel_id",
  authMiddleware,
  workspaceMiddleware(["Owner", "Admin"]),
  channelController.deleteChannel,
);

workspaceRouter.get(
  "/:workspace_id/channels/:channel_id/messages/:message_id",
  authMiddleware,
  workspaceMiddleware(),
  channelController.getAllByWorkspaceId,
);

workspaceRouter.post(
  "/:workspace_id/channels",
  authMiddleware,
  workspaceMiddleware(["Owner", "Admin"]),
  channelController.create,
);

workspaceRouter.put(
  "/:workspace_id/channels/:channel_id/update",
  authMiddleware,
  workspaceMiddleware(["Owner", "Admin"]),
  channelController.updateChannelName,
);

workspaceRouter.post(
  "/:workspace_id/channels/:channel_id/messages",
  authMiddleware,
  workspaceMiddleware(),
  channelMiddleware,
  messagesController.create,
);

workspaceRouter.get(
  "/:workspace_id/channels/:channel_id/messages",
  authMiddleware,
  workspaceMiddleware(),
  channelMiddleware,
  messagesController.getAllByChannelId,
);

workspaceRouter.delete(
  "/:workspace_id/channels/:channel_id/messages/:message_id",
  authMiddleware,
  workspaceMiddleware(),
  messagesController.delete,
);

export default workspaceRouter;
