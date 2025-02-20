const { I } = inject();

export = {
  visit(){
    I.amOnPage('/login')
  },

  fillUsername(username: string){
    I.fillField('[id="username"]', username)
  },

  fillPassword(password: string){
    I.fillField('[id="password"]', password)
  },  

  submitForm(){
    I.click('button.base-button.base-button--type-button.button.is-primary')
  },

  login(credentials: {username: string, password: string}){
    this.visit()
    this.fillUsername(credentials.username)
    this.fillPassword(credentials.password)
    this.submitForm()
},
}
