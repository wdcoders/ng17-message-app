import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { GetLoggedInUser, UserState } from '../../../store/UserState';
import { IUser } from '../../../core/models/auth.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Select(UserState.getLoggedUser) user$!: Observable<IUser>;
  isAuthenticate$!: Observable<boolean>;

  store: Store = inject(Store);

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.isAuthenticate$ = this.tokenService.isAuthentication;
  }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (user) => {
        if (!user) {
          this.store.dispatch(new GetLoggedInUser());
        }
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next() {},
    });
  }
}
