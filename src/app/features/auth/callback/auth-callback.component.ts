import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: '<p>Processing login...</p>',
})
export class AuthCallbackComponent implements OnInit {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);

  async ngOnInit() {
    // Check for session
    const { data } = await this.supabaseService.client.auth.getSession();

    if (data.session) {
      this.router.navigate(['/dashboard']);
    } else {
      // If no session, wait for onAuthStateChange or redirect to login
      // Usually, the Supabase client handles the hash parsing automatically
      // and updates the session state.
      // We can rely on the subscription in SupabaseService or potential delay.

      // Let's add a small listener just in case, or redirect back to login if it fails.
      this.router.navigate(['/auth/login']);
    }
  }
}
