import cls from "./NewsPage.module.scss"
import logo from "../../../shared/assets/postsFiles/ExampleAvatarPost.png"
import websitelink from "../../../shared/assets/postsFiles/WebSiteLink.png"
import likeheart from "../../../shared/assets/postsFiles/likeheart.png"
import likeButton from "../../../shared/assets/postsFiles/like.png"

import LikeClick from "../../../shared/assets/postsFiles/Likebutton.svg"
import CommentClick from "../../../shared/assets/postsFiles/CommentButton.svg"
import ShareClick from "../../../shared/assets/postsFiles/ShareButton.svg"

import ExampleCommentImage from "../../../shared/assets/postsFiles/ExampleCommentImage.png"

import {Link} from "react-router-dom";

const NewsPage = () => {
    return (
        <div className={cls.posts}>
            <div className={cls.post}>
                <div className={cls.user}>
                    <img src={logo} style={{width: 42, height: 42}}/>
                    <div className={cls.userInfo}>
                        <p>Jane Smith</p>
                        <p style={{color: "rgba(197,197,197,0.8)"}}>30m • <Link to="/about"><img src={websitelink}
                                                                                                 alt="link to website"/></Link>
                        </p>
                    </div>
                </div>
                <p className={cls.message}>Hey friends! 🌸 I have some thrilling news to share with all of you. 🎉 I'm
                    absolutely thrilled to embark on a new adventure that's just around the corner! 😍✨🌟🌈 </p>
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


            <div className={cls.post}>
                <div className={cls.user}>
                    <img src={logo} style={{width: 42, height: 42}}/>
                    <div className={cls.userInfo}>
                        <p>Jane Smith</p>
                        <p style={{color: "rgba(197,197,197,0.8)"}}>30m • <Link to="/about"><img src={websitelink}
                                                                                                 alt="link to website"/></Link>
                        </p>
                    </div>
                </div>
                <p className={cls.message}>🌟 Excited for a Delicious Surprise! 🌟 😍✨🌟🌈 </p>
                <img src={ExampleCommentImage} alt="imageFromUser"/>
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

        </div>
    );
};

export default NewsPage;