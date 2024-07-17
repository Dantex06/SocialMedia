import './DropDownMenu.css';
import { useRef, useState } from 'react';
import { Avatar, Button } from '@mui/material';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import { useClickOutside } from '@/shared/hooks/useClickOutside.ts';
import { Link } from 'react-router-dom';

const LinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '2vh'
};


const DropDownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
        if (isOpen) setTimeout(() => setIsOpen(false), 50);
    });
    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)}>
                <Avatar src={ava} />
            </Button>
            <nav className={`menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
                <ul className="menu_list">
                    <Link style={LinkStyle} to="/profile" onClick={() => setIsOpen(!isOpen)}>
                        <li className="menu_item">
                            Профиль
                        </li>
                    </Link>
                    <Link style={LinkStyle} to="/" onClick={() => setIsOpen(!isOpen)}>
                        <li className="menu_item" style={{ marginTop: '2vh' }}>
                            Новости
                        </li>
                    </Link>
                    <Link style={LinkStyle} to="/message" onClick={() => setIsOpen(!isOpen)}>
                        <li className="menu_item" style={{ marginTop: '2vh' }}>
                            Сообщения
                        </li>
                    </Link>
                    <Link style={LinkStyle} to="/music" onClick={() => setIsOpen(!isOpen)}>
                        <li className="menu_item" style={{ marginTop: '2vh' }}>
                            Музыка
                        </li>
                    </Link>
                    <Link style={LinkStyle} to="/settings" onClick={() => setIsOpen(!isOpen)}>
                        <li className="menu_item" style={{ marginTop: '2vh' }}>
                            Настройки
                        </li>
                    </Link>
                </ul>
            </nav>
        </>
    );
};

export default DropDownMenu;
