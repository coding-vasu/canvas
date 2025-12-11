import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  async onLogout() {
    await this.supabaseService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
