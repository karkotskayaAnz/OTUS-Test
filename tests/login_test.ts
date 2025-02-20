Feature('login');

Scenario('Успешная авторизация',  ({ I, LoginPage, config }) => {
    LoginPage.login({
        username: config.credentials.user.username,
        password: config.credentials.user.password
    })
    I.seeTitleEquals('Текущие задачи | Vikunja')
});

Scenario('Нельзя авторизоваться без пароля',  ({ I, LoginPage, config }) => {
    LoginPage.login({
        username: config.credentials.user.username,
        password: config.credentials.emptyUser.password
    })
    I.see('Введите пароль.')
});

Scenario('Нельзя авторизоваться без логина',  ({ I, LoginPage, config }) => {
    LoginPage.login({
        username: config.credentials.emptyUser.username,
        password: config.credentials.user.password
    })
    I.see('Введите имя пользователя.')
});

Scenario('Нельзя авторизоваться без логина и пароля',  ({ I, LoginPage, config }) => {
    LoginPage.login({
        username: config.credentials.emptyUser.username,
        password: config.credentials.emptyUser.password
    })
    I.see('Введите имя пользователя.'),
    I.see('Введите пароль.')
});

Scenario('Нельзя авторизоваться несуществующему пользователю',  ({ I, LoginPage, config }) => {
    LoginPage.login({
        username: config.credentials.nonExistentUser.username,
        password: config.credentials.nonExistentUser.password
    })
    I.see('Неверное имя пользователя или пароль.')
});
