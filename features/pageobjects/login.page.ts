import { $ } from '@wdio/globals'
import Page from './page';


class LoginPage extends Page {

    public get inputUsername () {
        return $(`[name="usernameOrEmail"]`);
    }

    public get inputPassword () {
        return $('[name="password"]');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }


    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('home');
    }
}

export default new LoginPage();
