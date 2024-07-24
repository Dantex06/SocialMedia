import { DropDownMenuLikes } from '@/widgets/DropDownMenuLikes';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useStores } from '@/app/store/root-store.context.ts';
import { useMediaPredicate } from 'react-media-hook';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CommentClick from '@/shared/assets/postsFiles/CommentButton.svg';
import websitelink from '@/shared/assets/postsFiles/WebSiteLink.png';
import ShareClick from '@/shared/assets/postsFiles/ShareButton.svg';
import LikeClick from '@/shared/assets/postsFiles/Likebutton.svg';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './Post.module.scss';

interface IPost {
    id: number;
    isLiked: boolean;
    likesCount: number;
    name: string | null;
    surname: string | null;
    text: string;
    photo: string | null;
    published: string | null;
    idUser: number | null;
    myId: number | null;
}

const Post = observer(({ id, isLiked, likesCount, name, surname, text, photo, published, idUser, myId }: IPost) => {
    const {
        likeStore: { likePost, deleteLikePost },
    } = useStores();

    const [isLikePost, setIsLikePost] = useState(isLiked);
    const [countLike, setCountLike] = useState(likesCount);
    useEffect(() => {}, [isLikePost]);

    const like = () => {
        likePost(id).then(() => {
            setCountLike((prevState) => prevState + 1);
            setIsLikePost(true);
        });
    };

    const deleteLike = () => {
        deleteLikePost(id).then(() => {
            setCountLike((prevState) => prevState - 1);
            setIsLikePost(false);
        });
    };

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
            <DropDownMenuLikes id={id} likes={countLike} myId={myId}/>
            <div className={cls.buttons}>
                <button onClick={() => (isLikePost ? deleteLike() : like())} style={isLikePost ? { background: '#308AFF' } : { background: 'gray' }} className={cls.button}>
                    <LikeClick />
                    <span>Like</span>
                </button>
                <button className={cls.button}>
                    <CommentClick />
                    <span>Comment</span>
                </button>
                <button className={cls.button}>
                    <ShareClick />
                    {!lessThan720 && <span>Share</span>}
                </button>
            </div>
        </div>
    );
});

export default Post;
