import cls from "./SideBar.module.scss"
import ExampleAvatar from "../../../shared/assets/SideBarIcons/ExampleAvatar.png"
import Notification from "../../../shared/assets/SideBarIcons/Notification.svg"
import Menu from "../../../shared/assets/SideBarIcons/Menu.svg"
import NewPostPhoto from "../../../shared/assets/SideBarIcons/PhotoNewPost.png"
import ExampleFriend from "../../../shared/assets/SideBarIcons/ExampleFriend.png"
import Search from "../../../shared/assets/SideBarIcons/Search.svg"
import Online from "../../../shared/assets/SideBarIcons/Online.png"
import Offline from "../../../shared/assets/SideBarIcons/Offline.png"
import {Link} from "react-router-dom";



const SideBar = () => {

    return (
            <div className={cls.sideBar}>
                <div className={cls.buttonHeader}>
                    <div className={cls.avatar}>
                        <Link to="/profile">
                            <img src={ExampleAvatar} alt="Avatar"/>
                        </Link>

                    </div>
                    <div className={cls.button}>
                        <Notification/>
                    </div>
                    <div className={cls.button}>
                        <Menu/>
                    </div>
                </div>

                <div className={cls.newPost}>
                    <p className={cls.titleNewPost}>New post</p>
                    <img src={NewPostPhoto} alt="New Post"/>
                    <div className={cls.descriptionNewPost}>
                        <p style={{width: 180, marginLeft: 15}}>Tell your friends about your news! </p>
                        <div className={cls.frinedsListPost}>
                            <img style={{marginRight: 5}} className={cls.friend} src={ExampleFriend} alt="Friends"/>
                            <img style={{marginRight: 5}} className={cls.friend} src={ExampleFriend} alt="Friends"/>
                        </div>
                    </div>
                </div>

                <div className={cls.contacts}>
                    <div className={cls.header}>
                        <p className={cls.titleSideBar}>Contacts</p>
                        <Search/>
                    </div>
                    <div className={cls.friendsSearch}>

                        <div className={cls.user}>
                            <div>
                                <img className={cls.userFriend} src={ExampleFriend} alt="Friend"/>
                                <img src={Online} alt=""/>
                            </div>
                            <p className={cls.userName}>Rhea Chan</p>
                        </div>

                        <div className={cls.user}>
                            <div>
                                <img className={cls.userFriend} src={ExampleFriend} alt="Friend"/>
                                <img src={Offline} alt=""/>
                            </div>
                            <p className={cls.userName}>Rhea Chan</p>
                        </div>

                        <div className={cls.user}>
                            <div>
                                <img className={cls.userFriend} src={ExampleFriend} alt="Friend"/>
                                <img src={Offline} alt=""/>
                            </div>
                            <p className={cls.userName}>Rhea Chan</p>
                        </div>

                        <div className={cls.user}>
                            <div>
                                <img className={cls.userFriend} src={ExampleFriend} alt="Friend"/>
                                <img src={Online} alt=""/>
                            </div>
                            <p className={cls.userName}>Rhea Chan</p>
                        </div>

                        <div className={cls.user}>
                            <div>
                                <img className={cls.userFriend} src={ExampleFriend} alt="Friend"/>
                                <img src={Online} alt=""/>
                            </div>
                            <p className={cls.userName}>Rhea Chan</p>
                        </div>


                    </div>
                </div>
            </div>
    );
};

export default SideBar;