import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface ILogin{
    "email": string,
    "password": string,
}


const Login = () => {
    const navigate = useNavigate();

    const {register, handleSubmit, formState} = useForm<ILogin>({
        mode: "onChange",
    })

    const eMailError = formState.errors['email']?.message
    const passError = formState.errors['password']?.message

    const onSubmit:SubmitHandler<ILogin> = (data) => {
        console.log(data)
        axios.post('http://localhost:8080/api/login', {
            "email": data.email,
            "password": data.password,
        }).then(() => {
                console.log(data)
                navigate('/');
            }
        )

        // axios.get("https://jsonplaceholder.typicode.com/posts").then(()=>navigate('/'))
    }


    return (
        <>
            <h1>Войди</h1>
            <p>Чтобы получить доступ</p>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onSubmit)}>

                <input type="email" placeholder="Введите почту:" {...register("email", {
                    required: "Это поле обязательно!",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                        message: "Неправильный адрес почты"
                    }
                })}/>
                {eMailError && <p style={{color: "red"}}>{eMailError}</p>}

                <input type="password" placeholder="Введите пароль:" {...register("password", {
                    required: "Это поле обязательно!",
                    pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        message: "Неправильно указан пароль! Должны использоваться заглавные буквы, цифры и спец. знаки"
                    }
                })}/>
                {passError && <p style={{color: "red"}}>{passError}</p>}



                <button type="submit">Войти</button>
            </form>
        </>
    );
};

export default Login;