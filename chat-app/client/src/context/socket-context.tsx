import { SOCKET_URL } from "../config/default";
import { createContext, useContext, useState } from "react";
import socketID, { Socket } from "socket.io-client";

//connection to the backend
export const SocketServer = socketID(SOCKET_URL);
//state of socket server
export const SocketContext = createContext<Context>({
  SocketServer,
  setUserName: () => {},
});

interface Context {
  SocketServer: Socket;
  userName?: string;
  setUserName: (value?: string) => void;
}

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string | undefined>();
  return (
    <SocketContext.Provider value={{ SocketServer, userName, setUserName }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);
export default SocketProvider;
