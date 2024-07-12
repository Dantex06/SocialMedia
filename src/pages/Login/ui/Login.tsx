import {useForm} from "react-hook-form";
import cls from "./Login.module.scss";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@mui/material"
import {useStores} from "../../../app/store/root-store.context.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type LoginValues = {
    email: string,
    password: string,
}

const Login = observer(() => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginValues>({})
    const {login, initialState: {authData: {accessToken, error}}} = useStores()
    const {initialState} = useStores()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if(accessToken){
            navigate('/');
        }
        initialState.authData.error = null
    }, [accessToken, navigate]);



    const onSubmit = (data: LoginValues) => {
        login(data);
        console.log(data);
    }

    return (
        <div className={cls.all}>
            <h1 className={cls.title}>
                Войдите
            </h1>
            <form  className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>
                    

                    <TextField
                        sx={{ input: { color: 'white'} }}
                        style={{margin: "17px 0"}} label="Почта" type="email"
                        {...register("email", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: "Неправильный адрес почты"
                        },
                    })}
                               error={!!errors['email']}
                               helperText={errors['email']?.message}/>
                    
                    <TextField
                        sx={{ input: { color: 'white' } }}
                        style={{margin: "17px 0"}}
                        label="Пароль"
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "Это поле обязательно!",
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                message: "Неправильно указан пароль! Должны использоваться заглавные буквы, цифры и спец. знаки"
                            }
                        })}
                        InputProps={{
                            endAdornment:  (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff style={{color: "white"}} /> : <Visibility style={{color: "white"}} />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={!!errors['password']}
                        helperText={errors['password']?.message}
                    />
                    
                    <Button type="submit" variant="contained" color="primary">
                        Войти
                    </Button>
                    <p className={cls.link}>Нету аккаунта? <Link to="/register">Зарегистрируйтесь</Link></p>
                </Stack>
            </form>
            {error ? <p className={cls.errorJoin}>Неверный логин или пароль</p>: ""}
        </div>
    )
});

export default Login;