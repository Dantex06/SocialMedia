import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useMediaPredicate } from 'react-media-hook';
import CommentClick from '@/shared/assets/postsFiles/CommentButton.svg';
import websitelink from '@/shared/assets/postsFiles/WebSiteLink.png';
import ShareClick from '@/shared/assets/postsFiles/ShareButton.svg';
import LikeClick from '@/shared/assets/postsFiles/Likebutton.svg';
import likeheart from '@/shared/assets/postsFiles/likeheart.png';
import likeButton from '@/shared/assets/postsFiles/like.png';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './Post.module.scss';


interface IPost {
    name: string | null;
    surname: string | null;
    text: string;
    photo: string | null;
    published: string | null;
    idUser: number | null;
    myId: number | null;
}

const Post = ({ name, surname, text, photo, published, idUser, myId }: IPost) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    return (
        <div className={cls.post}>
            <div className={cls.user}>
                <Link to={myId === idUser ? `${url}profile` : `${url}profile/${idUser}`}>
                    <Avatar alt="Avatar" src={ava} />
                </Link>
                <div className={cls.userInfo}>
                    <p>
                        {name} {surname}
                    </p>
                    <p style={{ color: 'rgba(197,197,197,0.8)' }}>
                        {published} •{' '}
                        <Link to="/about">
                            <img src={websitelink} alt="link to website" />
                        </Link>
                    </p>
                </div>
            </div>
            <p className={cls.message}>{text}</p>
            {photo ? <img src={photo} alt="photoPost" /> : ''}
            <div className={cls.likes}>
                <img src={likeButton} alt="like" />
                <img src={likeheart} alt="likeheart" />
                <span className={cls.like}>You & 1 other</span>
            </div>
            <div className="comments">
                <p className={cls.commentCount}>0 comments</p>
            </div>
            <div className={cls.buttons}>
                <button style={{ background: '#308AFF' }} className={cls.button}>
                    <LikeClick />
                    <span>Like</span>
                </button>
                <button className={cls.button}>
                    <CommentClick />
                    <span>Comment</span>
                </button>
                <button className={cls.button}>
                    <ShareClick />
                    {!lessThan720&&<span>Share</span>}
                </button>
            </div>
        </div>
    );
};

export default Post;
