const translation = {
    'Login': "Вход",
    "Register": "Регистрация",
    "News": "Новости",
    "Profile": "Профиль",
    "Message": "Сообщения",
    "Music": "Музыка",
    "Settings": "Настройки",
    "About": "О сайте",
    "Not_found": "Страница не найдена"
}

export const CamelCase = (word: string) => {
    const element = word.charAt(0).toUpperCase() + word.slice(1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return translation[element];
}
