import {useForm} from "react-hook-form";
import cls from "./Register.module.scss";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@mui/material"
import "../../../shared/css/mui.css";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
// import {useCookies} from "react-cookie";
import Cookies from 'js-cookie'

type RegisterValues = {
    name: string,
    surname: string,
    email: string,
    password: string,
    birthday: string
}

const Register = observer(() => {
    const {registration} = useStores()
    const {register, handleSubmit, formState} = useForm<RegisterValues>({})
    const {errors} = formState
    const {initialState: {authData: {accessToken, refreshToken}}} = useStores()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    // const [, setCookie] = useCookies(['refresh']);

    useEffect(() => {
        if(accessToken && refreshToken!==null){
            Cookies.set('refresh', refreshToken, {expires: 7});
            // setCookie( 'refresh', refreshToken);
            navigate('/');
        }
    }, [accessToken, navigate]);


    const onSubmit = (data: RegisterValues) => {
        registration(data)
        console.log(data);

    }
    return (
        <div>
            <h1 className={cls.title}>
                Регистрация
            </h1>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>

                    <TextField InputLabelProps={{style: {color: '#fff'}}} sx={{input: {color: 'white'}}}
                               style={{margin: "17px 0", color: "white"}} label="Имя"
                               type="text" {...register("name", {
                        required: "Это поле обязательно!",
                        minLength: {
                            value: 3, message: "Слишком мало символов"
                        },
                        maxLength: {
                            value: 15, message: "Слишком много символов"
                        }
                    })}
                               error={!!errors['name']}
                               helperText={errors['name']?.message}/>

                    <TextField InputLabelProps={{style: {color: '#fff'}}} sx={{input: {color: 'white'}}}
                               style={{margin: "17px 0"}} label="Фамилия" type="text" {...register("surname", {
                        required: "Это поле обязательно!",
                        minLength: {
                            value: 3, message: "Слишком мало символов"
                        },
                        maxLength: {
                            value: 15, message: "Слишком много символов"
                        }
                    })}
                               error={!!errors['surname']}
                               helperText={errors['surname']?.message}/>

                    <TextField InputLabelProps={{style: {color: '#fff'}}} sx={{input: {color: 'white'}}}
                               style={{margin: "17px 0"}} label="Почта" type="email" {...register("email", {
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
                            minLength: {
                                value: 8, message: "Слишком мало символов"
                            },
                            maxLength: {
                                value: 30, message: "Слишком много символов"
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

                    <TextField inputProps={{style: {color: "white",}}} sx={{input: {color: 'white'}}}
                               style={{margin: "17px 0"}} type="date" {...register("birthday", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^(19\d{2}|20(0[0-9]|1[0-4]))-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                            message: "Вам должно быть не менее 10 лет!"
                        }
                    })}
                               error={!!errors['birthday']}
                               helperText={errors['birthday']?.message}
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Зарегистрироваться
                    </Button>

                    <p className={cls.link}>Есть аккаунт? <Link to="/login">Войдите</Link></p>
                </Stack>
            </form>
        </div>
    )
});

export default Register;