import '../styles/Chats.css'
import Header from './Header'
import BottomBar from './BottomBar'
import fakeUser from '../mock/user.json'
import { useState } from 'react'

const Chats = () => {

    const [user, setUser] = useState(fakeUser);

    return (
        <div className="chats-container">
            <Header text="Chats" hasBackButton={false} />

            

            <BottomBar user={user}/>
        </div>
    );
}

export default Chats;
