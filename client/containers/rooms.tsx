import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";
import styles from '../styles/room.module.css'

function roomsContainer () {
    const { socket, roomId, rooms } = useSockets();
    const newRoomRef = useRef(null);

    function handleCreateRoom() {
        //get room name
        const roomName = newRoomRef.current.value || ""

        if(!String(roomName).trim()) return;

        //event room created
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});

        //set room name input to empty string
        newRoomRef.current.value = '';
    };

    function handleJoinRoom(key) {
        if(key === roomId) return;
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    };

    return (
    <nav className={styles.wrapper}>
        <div className={styles.createRoomWrapper}>
            <input ref={newRoomRef} placeholder='Room name' />
            <button className='cta' onClick={handleCreateRoom}>CREATE ROOM</button>
        </div>

        <ul className={styles.roomList}>

        {Object.keys(rooms).map((key) => {
            return (
                 <div key={key}>
                <button 
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
                >

                {rooms[key].name}
                </button>
                </div>
            );
    })}
    </ul>

    </nav>
    );
}

export default roomsContainer;