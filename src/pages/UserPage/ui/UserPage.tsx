import {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import {Avatar, Button, Stack, TextField} from "@mui/material";
import ava from "../../../shared/assets/SideBarIcons/cat.jpg"
import cls from "./MyProfile.module.scss"
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import {useForm} from "react-hook-form";
// import Post from "../../../widgets/Post/ui/Post.tsx";
import Cookies from "js-cookie";
import {useLocation} from "react-router-dom";



const UserPage = observer(() => {
    const location = useLocation();
    const {getUserData} = useStores()
    const id = location.pathname.split("/")[2];
    useEffect(() => {
        getUserData(id, Cookies.get('refresh')).then(()=>console.log('bomba'))
    }, []);
        // const {
        //     getProfile,
        //     createPost,
        //     initialState: {profileData: { name, surname, email, birthday}, authData:{isLoading, error}}
        // } = useStores();
        // // const [refresh, setRefresh] = useCookies(['refresh']);
        // const {handleSubmit, register, formState: {errors}} = useForm()
        // const [post, setPost] = useState(false);
        // const onSubmit = (data: PostRequest) => {
        //     console.log({...data, images_urls: []});
        //     createPost({...data, images_urls: []}, Cookies.get('refresh'))
        //     setPost(true);
        // }
        //
        // useEffect(() => {
        //     console.log("start")
        //     try {
        //         getProfile(Cookies.get('refresh'));
        //         // if(refreshToken!==null){
        //         //     setRefresh('refresh', refreshToken);
        //         // }
        //     }
        //     catch (e){
        //         console.log(e);
        //     }
        // }, [])
        //
        //
        // if (isLoading) {
        //     return <div>Loading...</div>;
        // }
        //
        // if (error) {
        //     return <div>{error.message}</div>;
        // }

        return (
            <div>
                user
            </div>
            // <div>
            //     <div className={cls.backgroundProfileAndAvatar}>
            //         <Avatar alt="Avatar" src={ava} sx={{width: 144, height: 144}}/>
            //         <div className={cls.icons}>
            //             <ShareIcon sx={{color: "white"}}/>
            //             <SettingsIcon sx={{color: "white"}}/>
            //         </div>
            //     </div>
            //     <div className={cls.personal}>
            //         <div className={cls.profile}>
            //             <h1>{name} {surname}</h1>
            //             <p>Email: {email}</p>
            //             <p>Birthday: {birthday}</p>
            //             <div className={cls.follow}>
            //                 <p>253 Following</p>
            //                 <p>555 Followers</p>
            //             </div>
            //         </div>
            //         <div className={cls.post}>
            //             <form onSubmit={handleSubmit(onSubmit)}>
            //                 <Stack spacing={2} width={400}>
            //                     <TextField
            //                         style={{marginTop: "17px", paddingLeft: "2vh"}}
            //                         id="outlined-textarea"
            //                         placeholder="Что у вас нового?"
            //                         multiline
            //                         {...register("content", {
            //                             required: "Это поле обязательно!",
            //                             minLength: {
            //                                 value: 3, message: "Слишком мало символов"
            //                             },
            //                             maxLength: {
            //                                 value: 400, message: "Слишком много символов"
            //                             }
            //                         })}
            //                         error={!!errors['content']}
            //                         helperText={errors['content']?.message}
            //                     />
            //
            //                     <Button style={{marginLeft: "2vh"}} type="submit" variant="contained" color="primary">
            //                         Опубликовать
            //                     </Button>
            //                     {post ? <p style={{textAlign: "center"}}>Пост успешно создан!</p> : ""}
            //                 </Stack>
            //             </form>
            //         </div>
            //     </div>
            //     {/*<Post name="Jane" surname="Smith52" text="Hey friends! 🌸 I have some thrilling news to share with all of you. 🎉 I'm*/}
            //     {/*        absolutely thrilled to embark on a new adventure that's just around the corner! 😍✨🌟🌈" photo={null}/>*/}
            //
            // </div>
        );
    })
;

export default UserPage