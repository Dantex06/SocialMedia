import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useStores } from '@/app/store/root-store.context.ts';
import { useMediaPredicate } from 'react-media-hook';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import cls from './Login.module.scss';


import Cookies from 'js-cookie';


type LoginValues = {
    email: string;
    password: string;
};

const Login = observer(() => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>({});
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    const {
        authStore: {
            login,
            initialState: {
                authData: { accessToken, error, refreshToken },
            },
        },
    } = useStores();

    const {
        authStore: { initialState },
    } = useStores();

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (accessToken && refreshToken !== null) {
            Cookies.set('refresh', refreshToken, { expires: 7 });
            navigate('/');
        }
        initialState.authData.error = null;
    }, [accessToken, navigate]);

    const onSubmit = (data: LoginValues) => {
        login(data);
    };

    return (
        <div className={cls.all}>
            <h1 className={cls.title}>Войдите</h1>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        style={lessThan720?{width: "39vh",margin: '3vh 0 2vh 3vh'}:{ margin: '17px 0' }}
                        label="Почта"
                        type="email"
                        {...register('email', {
                            required: 'Это поле обязательно!',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: 'Неправильный адрес почты',
                            },
                        })}
                        error={!!errors['email']}
                        helperText={errors['email']?.message}
                    />

                    <TextField
                        sx={{ input: { color: 'white' } }}
                        style={lessThan720?{width: "39vh",margin: '3vh 0 2vh 3vh'}:{ margin: '17px 0' }}
                        label="Пароль"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Это поле обязательно!',
                            minLength: {
                                value: 8,
                                message: 'Слишком мало символов',
                            },
                            maxLength: {
                                value: 30,
                                message: 'Слишком много символов',
                            },
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={!!errors['password']}
                        helperText={errors['password']?.message}
                    />

                    <Button style={lessThan720?{width: "39vh",margin: '3vh 0 2vh 3vh'}:{margin: "0 auto"}} type="submit" variant="contained" color="primary">
                        Войти
                    </Button>
                    <p className={cls.link} style={lessThan720?{width: "39vh",margin: '3vh 0 2vh 3vh'}:{}}>
                        Нету аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
                    </p>
                </Stack>
            </form>
            {error && <p className={cls.errorJoin}>Неверный логин или пароль</p>}
        </div>
    );
});

export default Login;
