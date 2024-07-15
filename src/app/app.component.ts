import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './core/services/socket.service';
import { Store } from '@ngxs/store';
import { GetAllMessage } from './store/MessageState';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  socketService: SocketService = inject(SocketService);
  store: Store = inject(Store);

  ngOnInit(): void {
    this.socketService.getMessages().subscribe({
      next: (response) => {
        this.store.dispatch(new GetAllMessage());
      },
    });
  }
}
