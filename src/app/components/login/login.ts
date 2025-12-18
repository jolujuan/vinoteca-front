import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Mode = 'login' | 'register';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mode: Mode = 'login';

  // login
  email = '';
  password = '';

  // register
  name = '';
  surname = '';
  regEmail = '';
  regPassword = '';

  error = '';
  loading = false;
  registerOk = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'] === 'register' ? 'register' : 'login';
      this.error = '';
      this.registerOk = '';
    });
  }

  goTo(mode: Mode) {
    this.router.navigate(['/userManagement/login'], { queryParams: { mode } });
  }

  setMode(mode: Mode) {
    this.mode = mode;
    this.error = '';
    this.registerOk = '';
  }

  loginSubmit(): void {
    this.error = '';
    this.loading = true;

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/wines');
      },
      error: () => {
        this.loading = false;
        this.error = 'Credenciales incorrectas.';
        this.cdr.detectChanges();
      },
    });
  }

  registerSubmit(): void {
    this.error = '';
    this.registerOk = '';
    this.loading = true;

    const email = this.regEmail.trim();
    const passwd = this.regPassword.trim();
    const errors: string[] = [];

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      errors.push('Escribe un correo válido (ej: user@example.com)');
    }

    if (passwd.length < 6) {
      errors.push('La contraseña debe tener mínimo 6 caracteres');
    }

    if (errors.length) {
      this.loading = false;
      this.error = errors.join('. ');
      return;
    }

    this.auth
      .register({
        email: this.regEmail.trim(),
        name: this.name.trim(),
        surname: this.surname.trim(),
        password: this.regPassword,
      })
      .subscribe({
        next: (res) => {
          this.loading = false;
          console.log(res.status);
          this.registerOk = res.status ?? 'Usuario registrado correctamente';
          this.goTo('login');
        },
        error: () => {
          this.loading = false;
          this.error = 'No se pudo registrar';
          this.cdr.detectChanges();
        },
      });
  }
}
