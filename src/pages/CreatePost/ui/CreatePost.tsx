import { Button, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import cls from './CreatePost.module.scss';
import { useForm } from 'react-hook-form';

type PostRequest = {
    userid: string;
    text: string;
    url: string | null;
    date: string;
};
const CreatePost = observer(() => {
    const { handleSubmit, register } = useForm<PostRequest>();

    const onSubmit = (data: PostRequest) => {
        console.log(data);
    };

    return (
        <div className={cls.post}>
            <h1>Создать пост</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={400}>
                    <TextField
                        style={{ margin: '17px 0' }}
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
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Опубликовать
                    </Button>
                </Stack>
            </form>
        </div>
    );
});

export default CreatePost;
