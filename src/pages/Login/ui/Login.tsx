import {useForm} from "react-hook-form";
// import {useNavigate} from "react-router-dom";
import cls from "./Login.module.scss";
import {Button, Stack, TextField} from "@mui/material"
import axios from "axios";
import "./Login.css";

type LoginValues = {
    email: string,
    password: string,
}

const Register = () => {
    const {register, handleSubmit, formState} = useForm<LoginValues>({})
    const {errors} = formState

    const onSubmit = (data: LoginValues) => {
        axios.post('http://localhost:8080/api/auth/login', {
            "email": data.email,
            "password": data.password,
        }).then((res) => {
                console.log(res)
            }
        )
        // axios.get('http://localhost:8080/api/ping').then((res)=>console.log(res))

        console.log(data);
    }
    return (
        <>
            <h1 className={cls.title}>
                Войдите
            </h1>
            <form  className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>

                    <TextField InputLabelProps={{style: { color: '#fff'}}} sx={{ input: { color: 'white' } }} style={{margin: "17px 0"}} label="Email" type="email" {...register("email", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: "Неправильный адрес почты"
                        },

                    })}
                               error={!!errors['email']}
                               helperText={errors['email']?.message}/>
                    <TextField InputLabelProps={{style: { color: '#fff'}}} sx={{ input: { color: 'white' } }} style={{margin: "17px 0"}} label="Password" type="password" {...register("password", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message: "Неправильно указан пароль! Должны использоваться заглавные буквы, цифры и спец. знаки"
                        }
                    })}
                               error={!!errors['password']}
                               helperText={errors['password']?.message}/>

                    <Button type="submit" variant="contained" color="primary">
                        Войти
                    </Button>
                </Stack>
            </form>
        </>
    )
};

export default Register;