import cls from './NewsPage.module.scss';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/store/root-store.context.ts';
import Post from '@/widgets/Post/ui/Post.tsx';
import Cookies from 'js-cookie';

const NewsPage = observer(() => {
    const {
        postsStore: {
            getPosts,
            initialState: {
                postsData: { posts, errors, loading },
            },
        },
    } = useStores();
    const refresh = Cookies.get('refresh');
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    useEffect(() => {
        if (refresh) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            getPosts(refresh);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>{errors}</div>;
    }
    if (!loading && !errors) {
        return (
            <div className={cls.posts}>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        name={post.author.name}
                        surname={post.author.surname}
                        text={post.content}
                        photo={null}
                        published={post.published_at}
                        idUser={post.author.id}
                        myId={userData ? userData.id : null}
                    />
                ))}
            </div>
        );
    }
});

export default NewsPage;
