import { useStores } from '@/app/store/root-store.context.ts';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Post from '@/widgets/Post/ui/Post.tsx';
import cls from './NewsPage.module.scss';
import { Loading } from '@/widgets/Loading';

export const NewsPage = observer(() => {
    const {
        postsStore: { getPosts, error, loading, posts },
    } = useStores();
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.log(error);
        return <div>{error.code}</div>;
    }
    if (!loading && !error) {
        return (
            <div className={cls.posts}>
                {posts.posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        isLiked={post.is_liked}
                        likesCount={post.likes_count}
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
