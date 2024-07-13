import logo from "../../../shared/assets/postsFiles/ExampleAvatarPost.png";
import cls from "./Post.module.scss"
import {Link} from "react-router-dom";
import websitelink from "../../../shared/assets/postsFiles/WebSiteLink.png";
import likeButton from "../../../shared/assets/postsFiles/like.png";
import likeheart from "../../../shared/assets/postsFiles/likeheart.png";
import LikeClick from "../../../shared/assets/postsFiles/Likebutton.svg";
import CommentClick from "../../../shared/assets/postsFiles/CommentButton.svg";
import ShareClick from "../../../shared/assets/postsFiles/ShareButton.svg";

interface IPost {
    name: string
    surname: string
    text: string
    photo: string | null
    published: string
}

const Post = ({name, surname, text, photo, published}: IPost) => {
    return (
        <div className={cls.post}>
            <div className={cls.user}>
                <img src={logo} style={{width: 42, height: 42}}/>
                <div className={cls.userInfo}>
                    <p>{name} {surname}</p>
                    <p style={{color: "rgba(197,197,197,0.8)"}}>{published} • <Link to="/about"><img src={websitelink} alt="link to website"/></Link>
                    </p>
                </div>
            </div>
            <p className={cls.message}>{text}</p>
            {photo? <img src={photo} alt="photoPost"/>: ""}
            <div className={cls.likes}>
                <img src={likeButton} alt="like"/>
                <img src={likeheart} alt="likeheart"/>
                <span className={cls.like}>You & 1 other</span>

            </div>
            <div className="comments">
                <p className={cls.commentCount}>0 comments</p>
            </div>
            <div className={cls.buttons}>
                <button style={{background: "#308AFF"}} className={cls.button}>
                    <LikeClick/>
                    <span>Like</span>
                </button>
                <button className={cls.button}>
                    <CommentClick/>
                    <span>Comment</span>
                </button>
                <button className={cls.button}>
                    <ShareClick/>
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default Post;