import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
