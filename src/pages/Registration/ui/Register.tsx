import {useForm} from "react-hook-form";
// import {useNavigate} from "react-router-dom";
import cls from "./Register.module.scss";
import {Button, Stack, TextField} from "@mui/material"
import axios from "axios";
import "./Register.css";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../app/store/root-store.context.ts";

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


    const onSubmit = (data: RegisterValues) => {
        registration(data)
        console.log(data);
        // axios.get('http://localhost:8080/api/ping').then((res)=>console.log(res))

    }
    return (
        <>
            <h1 className={cls.title}>
                Регистрация
            </h1>
            <form className={cls.form} onSubmit={handleSubmit(onSubmit)}>
                <Stack className={cls.form} spacing={2} width={400}>
                    <TextField InputLabelProps={{style: { color: '#fff'}}} sx={{ input: { color: 'white' } }}  style={{margin: "17px 0", color: "white"}} label="name" type="text" {...register("name", {
                                        required: "Это поле обязательно!",
                                        minLength: {
                                            value: 5, message: "Слишком мало символов"
                                        },
                                        maxLength: {
                                            value: 10, message: "Слишком много символов"
                                        }
                                    })}
                    error={!!errors['name']}
                    helperText={errors['name']?.message}/>

                    <TextField InputLabelProps={{style: { color: '#fff'}}} sx={{ input: { color: 'white' } }} style={{margin: "17px 0"}} label="surname" type="text" {...register("surname", {
                        required: "Это поле обязательно!",
                        minLength: {
                            value: 5, message: "Слишком мало символов"
                        },
                        maxLength: {
                            value: 10, message: "Слишком много символов"
                        }
                    })}
                               error={!!errors['name']}
                               helperText={errors['name']?.message}/>

                    <TextField InputLabelProps={{style: { color: '#fff'}}} sx={{ input: { color: 'white' } }} style={{margin: "17px 0"}} label="Email" type="email" {...register("email", {
                        required: "Это поле обязательно!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: "Неправильный адрес почты"
                        },

                    })}
                    error={!!errors['email']}
                    helperText={errors['email']?.message}/>
                    <TextField InputLabelProps={{style: { color: '#fff', }}} sx={{ input: { color: 'white' } }} style={{margin: "17px 0"}} label="Password" type="password" {...register("password", {
                                        required: "Это поле обязательно!",
                                        pattern: {
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                            message: "Неправильно указан пароль! Должны использоваться заглавные буквы, цифры и спец. знаки"
                                        }
                                    })}
                               error={!!errors['password']}
                               helperText={errors['password']?.message}/>


                    <TextField inputProps={{style: {color: "white", }}} sx={{ input: { color: 'white' } }}  style={{margin: "17px 0"}} type="date" {...register("birthday", {
                                        required: "Это поле обязательно!",
                                        pattern: {
                                            value: /^(19\d{2}|20(0[0-9]|1[0-4]))-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                                            message: "Вам должно быть не менее 10 лет!"
                                        }
                                    })}
                               error={!!errors['birthday']}
                               helperText={errors['birthday']?.message}
                    />

                    <Button className={cls.submit} type="submit" variant="contained" color="primary">
                        Зарегистрироваться
                    </Button>
                </Stack>
            </form>
        </>
    )
    // const navigate = useNavigate();
    // const {register, handleSubmit, formState} = useForm<IRegister>({
    //     mode: "onChange",
    // })
    //
    // const nameError = formState.errors['name']?.message
    // const surnameError = formState.errors['surname']?.message
    // const eMailError = formState.errors['email']?.message
    // const birthError = formState.errors['birthday']?.message
    // const passError = formState.errors['password']?.message
    //
    //
    // const onSubmit:SubmitHandler<IRegister> = (data) => {
    //     console.log(data)
    //     axios.post('http://localhost:8080/api/register', {
    //         "name": data.name,
    //         "surname": data.surname,
    //         "email": data.email,
    //         "date": data.birthday,
    //     }).then(() => {
    //         console.log(data)
    //         navigate('/');
    //         }
    //     )
    //
    //     // axios.get("https://jsonplaceholder.typicode.com/posts").then(()=>navigate('/'))
    // }
    //
    //
    // return (
    //     <div>
    //         <h1 className={cls.title}>Зарегестрируйтесь</h1>
    //         <p className={cls.description}>Чтобы получить доступ</p>
    //         <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onSubmit)}>
    //
    //             <input className={cls.input} type="text" placeholder="Введите имя:" {...register("name", {
    //                 required: "Это поле обязательно!",
    //                 minLength: {
    //                     value: 5, message: "Слишком мало символов"
    //                 },
    //                 maxLength: {
    //                     value: 10, message: "Слишком много символов"
    //                 }
    //             })}/>
    //             {nameError && <p className={cls.error}>{nameError}</p>}
    //
    //             <input className={cls.input} type="text" placeholder="Введите фамилию:" {...register("surname", {
    //                 required: "Это поле обязательно!",
    //                 minLength: {
    //                     value: 5, message: "Слишком мало символов"
    //                 },
    //                 maxLength: {
    //                     value: 10, message: "Слишком много символов"
    //                 },
    //             })}/>
    //             {surnameError && <p className={cls.error}>{surnameError}</p>}
    //
    //             <input className={cls.input} type="email" placeholder="Введите почту:" {...register("email", {
    //                 required: "Это поле обязательно!",
    //                 pattern: {
    //                     value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    //                     message: "Неправильный адрес почты"
    //                 }
    //             })}/>
    //             {eMailError && <p className={cls.error}>{eMailError}</p>}
    //
    //             <input className={cls.input} type="password" placeholder="Введите пароль:" {...register("password", {
    //                 required: "Это поле обязательно!",
    //                 pattern: {
    //                     value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //                     message: "Неправильно указан пароль! Должны использоваться заглавные буквы, цифры и спец. знаки"
    //                 }
    //             })}/>
    //             {passError && <p className={cls.error}>{passError}</p>}
    //
    //             <input className={cls.input} type="date" placeholder="Введите дату рождения:" {...register("birthday", {
    //                 required: "Это поле обязательно!",
    //                 pattern: {
    //                     value: /^(19\d{2}|20(0[0-9]|1[0-4]))-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
    //                     message: "Вам должно быть не менее 10 лет!"
    //                 }
    //             })}/>
    //             {birthError && <p className={cls.error}>{birthError}</p>}
    //
    //             <button className={cls.submit} type="submit">Зарегистрироваться</button>
    //         </form>
    //     </div>
    // );
});

export default Register;