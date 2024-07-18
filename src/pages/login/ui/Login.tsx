import { FormValidate } from '@/shared/TextField/ui/TextFieldCustom.tsx';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useStores } from '@/app/store/root-store.context.ts';
import { TextFieldCustom } from '@/shared/TextField';
import { useMediaPredicate } from 'react-media-hook';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import cls from './Login.module.scss';
import Cookies from 'js-cookie';


type LoginValues = {
    email: string;
    password: string;
};

export const Login = observer(() => {
    const lessThan720 = useMediaPredicate('(max-width: 720px)');
    const [showPassword, setShowPassword] = useState(false);
    const validation = (name: keyof LoginValues, pattern: { [key: string]: unknown }) => register(name, pattern)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>({});
    const {
        authStore: {login, errorsResponse}
    } = useStores();


    const onSubmit = (data: LoginValues) => {
        login(data).then(()=>{
            if(Cookies.get('refresh')) navigate('/')
        });
    };

    return (
        <div className={cls.all}>
            <h1 className={cls.title}>Войдите</h1>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>
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

                    <Button style={lessThan720?{width: "39vh",margin: '3vh 0 2vh 3vh'}:{margin: "0 auto"}} type="submit" variant="contained" color="primary">
                        Войти
                    </Button>
                    <p className={cls.link} style={lessThan720?{width: "39vh",margin: '3vh 0 2vh 3vh'}:{}}>
                        Нету аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
                    </p>
                </Stack>
            </form>
            {errorsResponse && <p className={cls.errorJoin}>Неверный логин или пароль</p>}
        </div>
    );
});

