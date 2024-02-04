import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthenticate$!: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.isAuthenticate$ = this.tokenService.isAuthentication;
  }

  logout() {
    this.authService.logout().subscribe({
      next() {},
    });
  }
}
