const { I, LoginPage, config } = inject();

Given('Пользователь открывает страницу авторизации', () => {
  LoginPage.visit()
});

When('Пользователь вводит правильные учетные данные', () => {
  const { user } = config.credentials.user
  LoginPage.fillUsername(user.email)
  LoginPage.fillPassword(user.password)
  LoginPage.submitForm()
});

Then('Пользователь успешно авторизован и перенаправлен на главную страницу', () => {
  I.seeTitleEquals('Текущие задачи | Vikunja')
});

When('Пользователь не вводит логин', () => {
  LoginPage.fillUsername(config.credentials.emptyUser.username)
  LoginPage.fillPassword(config.credentials.user.password)
  LoginPage.submitForm()
});

When('Пользователь не вводит пароль', () => {
  LoginPage.fillUsername(config.credentials.user.username)
  LoginPage.fillPassword(config.credentials.emptyUser.password)
  LoginPage.submitForm()
});

When('Пользователь не вводит логин и пароль', () => {
  LoginPage.fillUsername(config.credentials.emptyUser.username)
  LoginPage.fillPassword(config.credentials.emptyUser.password)
  LoginPage.submitForm()
});

Then('Появляется сообщение об ошибке Введите пароль', () => {
  I.see('Введите пароль.')
});

Then('Появляется сообщение об ошибке Введите логин', () => {
  I.see('Введите имя пользователя.')
});

Then('Появляется сообщения об ошибках Введите логин и Введите пароль ', () => {
  I.see('Введите имя пользователя.'),
  I.see('Введите пароль.')
});

When('Пользователь вводит несуществующие логин и пароль', () => {
  const { user } = config.credentials.nonExistentUser
  LoginPage.fillUsername(user.username)
  LoginPage.fillPassword(user.password)
  LoginPage.submitForm()
});

Then('Появляется сообщение об ошибке Неверное имя пользователя или пароль', () => {
  I.see('Неверное имя пользователя или пароль.')
})
