import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { SupabaseService } from '../../../core/services/supabase.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
    RouterLink,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loading = signal(false);

  protected form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async onLogin() {
    if (this.form.invalid) return;

    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    try {
      const { error } = await this.supabaseService.signInWithPassword(email!, password!);
      if (error) throw error;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged in successfully',
      });
      // Small delay to let user see toast before redirect (optional, but nice)
      setTimeout(() => this.router.navigate(['/dashboard']), 500);
    } catch (error: unknown) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: (error as Error).message || 'Login failed',
      });
      console.error('Login error:', (error as Error).message);
    } finally {
      this.loading.set(false);
    }
  }

  async onGoogleLogin() {
    try {
      const { error } = await this.supabaseService.signInWithGoogle();
      if (error) throw error;
      this.messageService.add({
        severity: 'success',
        summary: 'Redirecting',
        detail: 'Redirecting to Google...',
      });
    } catch (error: unknown) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: (error as Error).message || 'Google login failed',
      });
      console.error('Google login error:', (error as Error).message);
    }
  }
}
