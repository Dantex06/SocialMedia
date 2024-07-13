import cls from "./NewsPage.module.scss"
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import {useCookies} from "react-cookie";
import Post from "../../../widgets/Post/ui/Post.tsx";

const NewsPage = observer(() => {
    const {getPosts, initialState:{postsData: {posts, errors, loading}}} = useStores()
    const [refresh] = useCookies(['refresh']);

    useEffect(() => {
        getPosts(refresh)
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
                    <Post name={post.author.name} surname={post.author.surname} text={post.content} photo={null} published={post.published_at} />
            ))}
        </div>
        // <div className={cls.posts}>
        //
        //     <div className={cls.post}>
        //         <div className={cls.user}>
        //             <img src={logo} style={{width: 42, height: 42}}/>
        //             <div className={cls.userInfo}>
        //                 <p>Jane Smith</p>
        //                 <p style={{color: "rgba(197,197,197,0.8)"}}>30m • <Link to="/about"><img src={websitelink}
        //                                                                                          alt="link to website"/></Link>
        //                 </p>
        //             </div>
        //         </div>
        //         <p className={cls.message}>Hey friends! 🌸 I have some thrilling news to share with all of you. 🎉 I'm
        //             absolutely thrilled to embark on a new adventure that's just around the corner! 😍✨🌟🌈 </p>
        //         <div className={cls.likes}>
        //             <img src={likeButton} alt="like"/>
        //             <img src={likeheart} alt="likeheart"/>
        //             <span className={cls.like}>You & 1 other</span>
        //
        //         </div>
        //         <div className="comments">
        //             <p className={cls.commentCount}>0 comments</p>
        //         </div>
        //         <div className={cls.buttons}>
        //             <button style={{background: "#308AFF"}} className={cls.button}>
        //                 <LikeClick/>
        //                 <span>Like</span>
        //             </button>
        //             <button className={cls.button}>
        //                 <CommentClick/>
        //                 <span>Comment</span>
        //             </button>
        //             <button className={cls.button}>
        //                 <ShareClick/>
        //                 <span>Share</span>
        //             </button>
        //         </div>
        //     </div>
        //
        //
        //     <div className={cls.post}>
        //         <div className={cls.user}>
        //             <img src={logo} style={{width: 42, height: 42}}/>
        //             <div className={cls.userInfo}>
        //                 <p>Jane Smith</p>
        //                 <p style={{color: "rgba(197,197,197,0.8)"}}>30m • <Link to="/about"><img src={websitelink}
        //                                                                                          alt="link to website"/></Link>
        //                 </p>
        //             </div>
        //         </div>
        //         <p className={cls.message}>🌟 Excited for a Delicious Surprise! 🌟 😍✨🌟🌈 </p>
        //         <img src={ExampleCommentImage} alt="imageFromUser"/>
        //         <div className={cls.likes}>
        //             <img src={likeButton} alt="like"/>
        //             <img src={likeheart} alt="likeheart"/>
        //             <span className={cls.like}>You & 1 other</span>
        //         </div>
        //         <div className="comments">
        //             <p className={cls.commentCount}>0 comments</p>
        //         </div>
        //         <div className={cls.buttons}>
        //             <button style={{background: "#308AFF"}} className={cls.button}>
        //                 <LikeClick/>
        //                 <span>Like</span>
        //             </button>
        //             <button className={cls.button}>
        //                 <CommentClick/>
        //                 <span>Comment</span>
        //             </button>
        //             <button className={cls.button}>
        //                 <ShareClick/>
        //                 <span>Share</span>
        //             </button>
        //         </div>
        //     </div>
        //
        // </div>
    );
});

export default NewsPage;