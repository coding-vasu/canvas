import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected readonly loading = signal(false);

  async onRegister() {
    if (this.form.invalid) return;

    this.loading.set(true);
    const { email, password } = this.form.getRawValue();

    try {
      const { error } = await this.supabase.signUp(email, password);
      if (error) throw error;
      alert(
        'Registration successful! Please check your email for confirmation (if enabled) or sign in.',
      );
      await this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + (error as Error).message);
    } finally {
      this.loading.set(false);
    }
  }
}
