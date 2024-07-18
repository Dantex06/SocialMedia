import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useStores } from '@/app/store/root-store.context.ts';
import { TextFieldCustom } from '@/shared/TextField';
import { useMediaPredicate } from 'react-media-hook';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import cls from './Register.module.scss';
import '@/shared/css/mui.css';
import Cookies from 'js-cookie';



type RegisterValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
    birthday: string;
};

export const Register = observer(() => {
    const {
        authStore: {
            registration, errorsResponse
        },
    } = useStores();
    const { register, handleSubmit, formState, reset } = useForm<RegisterValues>({});
    const { errors } = formState;
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const lessThan720 = useMediaPredicate('(max-width: 720px)');

    const onSubmit = (data: RegisterValues) => {
        registration(data).then(()=>{
            if(Cookies.get('refresh')) navigate('/')
        }).catch(()=>reset());
    };

    const patternLength = {
        required: 'Это поле обязательно!',
        minLength: {
            value: 3,
            message: 'Слишком мало символов',
        },
        maxLength: {
            value: 15,
            message: 'Слишком много символов',
        }
    }

    const validation = (name: keyof RegisterValues, pattern: { [key: string]: unknown }) => register(name, pattern)


    return (
        <div style={{ marginTop: '45px' }}>
            <h1 className={cls.title}>Регистрация</h1>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>
                    <TextFieldCustom register={validation('name', patternLength)} errors={errors['name']} label={'Имя'} />
                    <TextFieldCustom register={validation('surname', patternLength)} errors={errors['surname']} label={'Фамилия'} />

                    <TextFieldCustom
                        register={validation('email', {
                            required: 'Это поле обязательно!',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                                message: 'Неправильный адрес почты',
                            },
                        })}
                        errors={errors['email']}
                        label={'Почта'}
                    />

                    <TextField
                        sx={{ input: { color: 'white' } }}
                        style={lessThan720 ? { width: '39vh', margin: '2vh 0 1vh 3vh' } : { margin: '2vh 0' }}
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

                    <TextFieldCustom
                        register={validation('birthday', {
                            required: 'Это поле обязательно!',
                            pattern: {
                                value: /^(19\d{2}|20(0[0-9]|1[0-4]))-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                message: 'Вам должно быть не менее 10 лет!',
                            },
                        })}
                        errors={errors['birthday']}
                        label={''}
                        type={'date'}
                    />

                    <Button style={lessThan720 ? { width: '39vh', margin: '2vh 0 1vh 3vh' } : {}} type="submit" variant="contained" color="primary">
                        Зарегистрироваться
                    </Button>

                    <p className={cls.link} style={lessThan720 ? { width: '39vh', margin: '3vh 0 2vh 3vh' } : {}}>
                        Есть аккаунт? <Link to="/login">Войдите</Link>
                    </p>
                    <p className={cls.errorJoin}>{errorsResponse?.response?.status === 409 ? 'Данная почта уже зарегестрирована' : errorsResponse !== null ? 'Произошла непредвиденная ошибка' : ''}</p>
                </Stack>
            </form>
        </div>
    );
});

