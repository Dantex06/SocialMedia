import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/store/root-store.context.ts';
import { Avatar, Button, Stack, TextField } from '@mui/material';
import ava from '@/shared/assets/SideBarIcons/cat.jpg';
import cls from './MyProfile.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

type PostRequest = {
    text: string;
};

const MyProfile = observer(() => {
    const {
        profileStore: {
            getProfile,
            createPost,
            initialState: {
                profileData: { loading, error },
            },
        },
    } = useStores();
    // const [refresh, setRefresh] = useCookies(['refresh']);
    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<PostRequest>();
    const [post, setPost] = useState(false);
    const [errorRequest, setErrorRequest] = useState('')
    const onSubmit = (data: PostRequest) => {
        const trimmedText = data.text.trim();
        reset()
        if (trimmedText.replace(/\s/g, '').length === 0) {
            setErrorRequest('Ошибка при отправке сообщения')
            return;
        }
        setErrorRequest('');
        createPost({ content: trimmedText, images_urls: [] }, Cookies.get('refresh'));
        setPost(true);

    };
    const storedProfile = window.localStorage.getItem('profile_id');
    const userData = storedProfile ? JSON.parse(storedProfile) : null;
    useEffect(() => {
        try {
            getProfile(Cookies.get('refresh'));
        } catch (e) {
            console.log(e);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        storedProfile && (
            <div>
                <div className={cls.backgroundProfileAndAvatar}>
                    <Avatar alt="Avatar" src={ava} sx={{ width: 144, height: 144 }} />
                    <div className={cls.icons}>
                        <ShareIcon sx={{ color: 'white' }} />
                        <SettingsIcon sx={{ color: 'white' }} />
                    </div>
                </div>
                <div className={cls.personal}>
                    <div className={cls.profile}>
                        <h1>
                            {userData.name} {userData.surname}
                        </h1>
                        <p>Email: {userData.email}</p>
                        <p>Birthday: {userData.birthday}</p>
                        <div className={cls.follow}>
                            <p>253 Following</p>
                            <p>555 Followers</p>
                        </div>
                    </div>
                    <div className={cls.post}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2} width={400}>
                                <TextField
                                    style={{
                                        marginTop: '17px',
                                        paddingLeft: '2vh',
                                    }}
                                    id="outlined-textarea"
                                    placeholder="Что у вас нового?"
                                    multiline
                                    {...register('text', {
                                        required: 'Это поле обязательно!',
                                        minLength: {
                                            value: 3,
                                            message: 'Слишком мало символов',
                                        },
                                        maxLength: {
                                            value: 400,
                                            message: 'Слишком много символов',
                                        },
                                    })}
                                    error={!!errors['text']}
                                    helperText={errors['text']?.message}
                                />

                                <Button style={{ marginLeft: '2vh' }} type="submit" variant="contained" color="primary">
                                    Опубликовать
                                </Button>
                                {(errorRequest && !post) && <p style={{ textAlign: 'center' }}>{errorRequest}</p>}
                                {(post && !errorRequest) && <p style={{ textAlign: 'center' }}>Пост успешно создан!</p>}
                            </Stack>
                        </form>
                    </div>
                </div>
                {/*<Post name="Jane" surname="Smith52" text="Hey friends! 🌸 I have some thrilling news to share with all of you. 🎉 I'm*/}
                {/*        absolutely thrilled to embark on a new adventure that's just around the corner! 😍✨🌟🌈" photo={null}/>*/}
            </div>
        )
    );
});
export default MyProfile;
