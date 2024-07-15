import cls from './SideBar.module.scss';
import Notification from '@/shared/assets/SideBarIcons/Notification.svg';
import Menu from '@/shared/assets/SideBarIcons/Menu.svg';
import NewPostPhoto from '@/shared/assets/SideBarIcons/PhotoNewPost.png';
import ExampleFriend from '@/shared/assets/SideBarIcons/ExampleFriend.png';
import Search from '@/shared/assets/SideBarIcons/Search.svg';
import Online from '@/shared/assets/SideBarIcons/Online.png';
import Offline from '@/shared/assets/SideBarIcons/Offline.png';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <div className={cls.sideBar}>
            <div className={cls.buttonHeader}>
                <div className={cls.avatar}>
                    <Link to="/profile">
                        <Avatar src={ava} />
                    </Link>
                </div>
                <div className={cls.button}>
                    <Notification />
                </div>
                <div className={cls.button}>
                    <Menu />
                </div>
            </div>

            <div className={cls.newPost} onClick={() => navigate('/profile')}>
                <p className={cls.titleNewPost}>Создать пост</p>
                <img src={NewPostPhoto} alt="Новый пост" />
                <div className={cls.descriptionNewPost}>
                    <p style={{ width: 180, marginLeft: 15 }}>Расскажи друзьям о своих новостях! </p>
                    <div className={cls.frinedsListPost}>
                        <img style={{ marginRight: 5 }} className={cls.friend} src={ExampleFriend} alt="Friends" />
                        <img style={{ marginRight: 5 }} className={cls.friend} src={ExampleFriend} alt="Friends" />
                    </div>
                </div>
            </div>

            <div className={cls.contacts}>
                <div className={cls.header}>
                    <p className={cls.titleSideBar}>Контакты</p>
                    <Search />
                </div>
                <div className={cls.friendsSearch}>
                    <div className={cls.user}>
                        <div>
                            <img className={cls.userFriend} src={ExampleFriend} alt="Friend" />
                            <img src={Online} alt="" />
                        </div>
                        <p className={cls.userName}>Rhea Chan</p>
                    </div>

                    <div className={cls.user}>
                        <div>
                            <img className={cls.userFriend} src={ExampleFriend} alt="Friend" />
                            <img src={Offline} alt="" />
                        </div>
                        <p className={cls.userName}>Rhea Chan</p>
                    </div>

                    <div className={cls.user}>
                        <div>
                            <img className={cls.userFriend} src={ExampleFriend} alt="Friend" />
                            <img src={Offline} alt="" />
                        </div>
                        <p className={cls.userName}>Rhea Chan</p>
                    </div>

                    <div className={cls.user}>
                        <div>
                            <img className={cls.userFriend} src={ExampleFriend} alt="Friend" />
                            <img src={Online} alt="" />
                        </div>
                        <p className={cls.userName}>Rhea Chan</p>
                    </div>

                    <div className={cls.user}>
                        <div>
                            <img className={cls.userFriend} src={ExampleFriend} alt="Friend" />
                            <img src={Online} alt="" />
                        </div>
                        <p className={cls.userName}>Rhea Chan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
