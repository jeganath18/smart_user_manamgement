import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule],
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

  // MODAL STATES

  isProfileOpen = false;

  visible = false;

  position = {
    x: 0,
    y: 0
  };

  // OPEN MODAL

  openProfileModal() {
    this.isProfileOpen = true;
  }

  // CLOSE MODAL

  closeProfileModal() {
    this.isProfileOpen = false;
  }

  // GLOW EFFECT

  handleMouseMove(event: MouseEvent) {

    const target = event.currentTarget as HTMLElement;

    const bounds = target.getBoundingClientRect();

    this.position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top
    };
  }

  logout() {

  localStorage.clear();

  window.location.href = '/login';

}

addMemberModal = false;

memberForm = {
  name: '',
  email: '',
  designation: ''
};

openAddMemberModal() {
  this.addMemberModal = true;
  console.log("hii");
}

closeAddMemberModal() {
  this.addMemberModal = false;
}

createMember() {

  console.log(this.memberForm);

  // API CALL HERE

  this.closeAddMemberModal();

}

}