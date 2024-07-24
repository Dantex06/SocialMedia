import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useClickOutside } from '@/shared/hooks/useClickOutside.ts';
import { useStores } from '@/app/store/root-store.context.ts';
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './DropDownMenuLikes.module.scss';
import likeButton from '@/shared/assets/postsFiles/like.png';
import likeheart from '@/shared/assets/postsFiles/likeheart.png';

interface IDropDown {
    id: number;
    likes: number;
    myId: number | null;
}

export const DropDownMenuLikes = observer(({ id, likes, myId }: IDropDown) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const {
        likeStore: { whoLiked, likeUsers, clearLikeUsers },
    } = useStores();
    useClickOutside(menuRef, () => {
        if (isOpen) setTimeout(() => setIsOpen(false), 50);
    });
    useEffect(() => {
        if (!isOpen) {
            clearLikeUsers();
        }
    }, [isOpen]);

    return (
        <>
            <div className={cls.likes} onClick={() => likes && whoLiked(id).then(() => setIsOpen(!isOpen))}>
                <img src={likeButton} alt="like" />
                <img src={likeheart} alt="likeheart" />
                <span className={cls.like}>{likes} likes</span>
            </div>
            <nav className={isOpen ? cls.menuActive : cls.menu} ref={menuRef}>
                <ul className={cls.menu_list}>
                    {likeUsers && (
                        likeUsers.likes.map((user) => (
                            <Link key={user.user.id} className={cls.linkStyle} to={myId === user.user.id ? `${url}profile` : `${url}profile/${user.user.id}`}>
                                <li className={cls.menu_item}>
                                    <Avatar src={ava} />
                                    <div>
                                        {user.user.name} {user.user.surname}
                                    </div>
                                </li>
                            </Link>
                        ))
                    )}
                </ul>
            </nav>
        </>
    );
});
