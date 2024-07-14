import cls from "./NewsPage.module.scss"
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import Post from "../../../widgets/Post/ui/Post.tsx";
import Cookies from "js-cookie";

const NewsPage = observer(() => {
    const {getPosts, initialState:{postsData: {posts, errors, loading}, profileData: {id}}} = useStores()
    const refresh = Cookies.get('refresh')
    useEffect(() => {
            if(refresh){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                getPosts(refresh)
            }

    }, []);

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    if(errors){
        return(
            <div>{errors}</div>
        )
    }

    return (
        <div className={cls.posts}>
            {posts.map((post)=>(
                    <Post name={post.author.name} surname={post.author.surname} text={post.content} photo={null} published={post.published_at} idUser={post.author.id} myId={typeof id === "number"?id:null}/>

            ))}
        </div>
    );
});

export default NewsPage;