import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardHome {

  members = [
    {
      name: "John Michael",
      email: "john@creative-tim.com",
      role: "Manager",
      dept: "Organization",
      status: "online",
      employed: "23/04/18",
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
    },
    {
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      role: "Programator",
      dept: "Developer",
      status: "offline",
      employed: "23/04/18",
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
    }
  ];

}