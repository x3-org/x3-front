import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";
import { Router, Params } from '@angular/router';
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    @Input() user: User;
    error: any;
    navigated = false; // true if navigated here


    constructor(
        private loginService: LoginService,
        private router: Router) {
    }

    ngOnInit() {
        this.user = new User();
    }

    login() {
        this.loginService
        .login(this.user)
        .then(user => {
            this.user = user; // login user
            
        })
        .catch(error => this.error = error); // TODO: Display error message
    }

    gotoUsersDetail() {
        this.router.navigate(['/student']);
    }


    goBack() {
        window.history.back();
    }
}