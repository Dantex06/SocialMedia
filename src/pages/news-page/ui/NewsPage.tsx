import { useStores } from '@/app/store/root-store.context.ts';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Post from '@/widgets/Post/ui/Post.tsx';
// import Cookies from 'js-cookie';
import cls from './NewsPage.module.scss';

const NewsPage = observer(() => {
    const {
        postsStore: {
            getPosts,
            initialState: {
                postsData: { posts, errors, loading },
            },
        },
    } = useStores();
    // const refresh = Cookies.get('refresh');
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    useEffect(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            getPosts();

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
