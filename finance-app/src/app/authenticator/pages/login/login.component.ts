import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'fin-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formAuthenticator!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    protected _router: Router,
    private _storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.formAuthenticator = this._fb.group({
      auth_email: ['', Validators.compose([Validators.required, Validators.email])],
      auth_password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  autenticarUsuario() {
    if (this.formAuthenticator.valid) {
      const form = this.formAuthenticator.getRawValue();
      this._authService.loginUser$(form).subscribe({
        next: (res) => {
          this._storageService.saveUser(res.token);
          this._router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
