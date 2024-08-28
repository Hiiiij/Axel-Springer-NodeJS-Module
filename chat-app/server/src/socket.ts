import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  CONNECTION: "connection" //when a new error is connected to the socket
}
function socketServerHandler({ ioServer }:
  {
  ioServer: Server
}) {
  logger.info("Socket is enabled");
  ioServer.on(EVENTS.CONNECTION, (socket: Socket) => {
  logger.info(`new client connected with an id of${socket.id}`)
  })
 }
export default socketServerHandler;






