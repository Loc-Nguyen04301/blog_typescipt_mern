import React, { useEffect } from 'react'
import { CREATE_COMMENT, IComment } from './redux/types/commentType'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from './utils/TypeScript'

//Socket.io
import { io } from "socket.io-client";
import { SOCKET } from "./redux/types/socketType";

const ClientSocket = () => {
    const socket = useSelector((state: RootStore) => state.socket)
    const dispatch = useDispatch()

    // Socket Config 
    useEffect(() => {
        const socket = io(`${import.meta.env.VITE_SERVER_URL}`, {
            withCredentials: true
        });
        socket.on("connect", () => {
            console.log(socket.id + " connected");
        });
        dispatch({ type: SOCKET, payload: socket });
        return () => {
            socket.on("disconnect", () => {
                console.log(socket.id + " disconnected");
            });
            socket.close()
        }
    }, [dispatch]);

    //Create Comment Realtime
    useEffect(() => {
        if (!socket) return

        socket.on("createComment", (data: IComment) => {
            dispatch({ type: CREATE_COMMENT, payload: data })
        })

        return () => { socket.off('createComment') }
    }, [dispatch, socket])
}

export default ClientSocket