import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button } from '@mui/material';
import { useStores } from '@/app/store/root-store.context.ts';
import { useLocation } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import Post from '../../../widgets/Post/ui/Post.tsx';
import { Loading } from '@/widgets/Loading';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './UserPage.module.scss';
import Cookies from 'js-cookie';



export const UserPage = observer(() => {
    const location = useLocation();
    const id = Number(location.pathname.split('/')[2]);
    const refresh = Cookies.get('refresh');
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    const {
        postsStore: {getUserPosts, userPosts},
        usersStore: {
            getUserData,
            loading,
            error,
            profile: { name, surname, email, birthday },
        },
    } = useStores();

    useEffect(() => {
        if (refresh) {
            getUserData(id)
                .then(() => getUserPosts(id))
                .catch((err) => console.log(err));
        }
    }, []);
    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.log(error);
        return <div>{error.code}</div>;
    }

    return (
        <div>
            <div className={cls.backgroundProfileAndAvatar}>
                <Avatar alt="Avatar" src={ava} sx={lessThan720 ? { width: 78, height: 78 } : { width: 144, height: 144 }} />
                <div className={cls.icons}>
                    <Button style={{ marginRight: '2vh' }} variant="contained">
                        Подписаться
                    </Button>
                    <ShareIcon style={{ marginBottom: '0.5vh' }} sx={{ color: 'white' }} />
                </div>
            </div>
            <div className={cls.personal}>
                <div className={cls.profile}>
                    <h1>
                        {name} {surname}
                    </h1>
                    <p>Email: {email}</p>
                    <p>Birthday: {birthday}</p>
                    <div className={cls.follow}>
                        <p>253 Following</p>
                        <p>555 Followers</p>
                    </div>
                </div>
            </div>
            <div className={cls.posts}>
                {userPosts.posts.map((post) => (
                 <Post
                  key={post.id}
                  likesCount={post.likes_count}
                  id={post.id}
                  isLiked={post.is_liked}
                  name={name}
                  surname={surname}
                  text={post.content}
                  photo={null}
                  published={post.published_at}
                  idUser={post.id}
                  myId={userData ? userData.id : null}
                 />
                ))}
            </div>
        </div>
    );
});
