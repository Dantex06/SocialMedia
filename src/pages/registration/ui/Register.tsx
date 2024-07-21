import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { FormValidate, TextFieldCustom } from '@/shared/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useStores } from '@/app/store/root-store.context.ts';
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

    const validation = (name: keyof RegisterValues, pattern: typeof FormValidate.length | typeof FormValidate.date) => register(name, pattern)


    return (
        <div style={{ marginTop: '45px' }}>
            <h1 className={cls.title}>Регистрация</h1>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2}>
                    <TextFieldCustom register={validation('name', FormValidate.length)} errors={errors['name']} label={'Имя'} />
                    <TextFieldCustom register={validation('surname', FormValidate.length)} errors={errors['surname']} label={'Фамилия'} />
                    <TextFieldCustom register={validation('email', FormValidate.email)} errors={errors['email']} label={'Почта'} />
                    <TextFieldCustom
                     register={validation('password', FormValidate.password)}
                     errors={errors['password']}
                     label={'Пароль'}
                     inputProps={{}}
                     type={showPassword ? 'text' : 'password'}
                     endAdornment={
                         <InputAdornment position="end">
                             <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                                 {showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                             </IconButton>
                         </InputAdornment>
                     }
                    />

                    <TextFieldCustom register={validation('birthday', FormValidate.date)} errors={errors['birthday']} label={''} type={'date'} />

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

