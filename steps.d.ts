/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type LoginPage = typeof import('./pages/LoginPage');
type config = typeof import('./framework/config/configBdd');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, LoginPage: LoginPage, config: config }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
