import { Component, OnInit, PLATFORM_ID, inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.html',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
})
export class DashboardHome implements OnInit {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  readonly API = 'https://sm-backend-pi.vercel.app/members';

  members: any[] = [];
  isCreatingMember = false;
  editMode = false;
  selectedMember: any = null;
  deleteModal = false;
  memberToDelete: any = null;
  isDeleting = false;
  isProfileOpen = false;
  visible = false;
  position = { x: 0, y: 0 };
  addMemberModal = false;
  memberForm = { name: '', email: '', designation: '' };
  searchTerm = '';

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      setTimeout(() => {

        this.getMembers();

      }, 0);

    }

  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ''
    });
  }

  get filteredMembers() {

    if (!this.searchTerm.trim()) {
      return this.members;
    }

    return this.members.filter(member =>
      member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getMembers() {
    this.http.get<any[]>(this.API, { headers: this.getHeaders() })
      .subscribe(data => {
        this.members = data || [];
      });
    this.cdr.detectChanges();
  }

  createMember() {
    if (this.isCreatingMember) return;
    this.isCreatingMember = true;
    this.addMemberModal = false;
    const formSnapshot = { ...this.memberForm };
    const memberSnapshot = this.selectedMember;
    const isEdit = this.editMode && memberSnapshot;

    const url = isEdit ? `${this.API}/${memberSnapshot._id}` : this.API;
    const request = isEdit
      ? this.http.put<any>(url, formSnapshot, { headers: this.getHeaders() })
      : this.http.post<any>(url, formSnapshot, { headers: this.getHeaders() });

    request.subscribe({
      next: (data) => {
        if (isEdit) {
          this.members = this.members.map(m =>
            m._id === memberSnapshot._id ? data.member : m
          );
        } else {
          this.members = [data.member, ...this.members];
        }
        this.memberForm = { name: '', email: '', designation: '' };
        this.editMode = false;
        this.selectedMember = null;
        this.isCreatingMember = false;
      },
      error: (err) => {
        console.log(err);
        this.isCreatingMember = false;
      }
    });
  }

  deleteMember() {
    if (this.isDeleting || !this.memberToDelete) return;
    this.isDeleting = true;
    this.isDeleting = false;
    this.deleteModal = false;

    const idToDelete = this.memberToDelete._id;

    this.http.delete(`${this.API}/${idToDelete}`, { headers: this.getHeaders() })
      .subscribe({
        next: () => {
          this.members = this.members.filter(m => m._id !== idToDelete);
          this.memberToDelete = null;

        },
        error: (err) => {
          console.log(err);
          this.isDeleting = false;
        }
      });
  }

  openEditMemberModal(member: any) {
    this.editMode = true;
    this.selectedMember = member;
    this.memberForm = {
      name: member.name,
      email: member.email,
      designation: member.designation
    };
    this.addMemberModal = true;
  }

  closeAddMemberModal() {
    this.addMemberModal = false;
    this.editMode = false;
    this.selectedMember = null;
    this.memberForm = { name: '', email: '', designation: '' };
  }

  openDeleteModal(member: any) {
    this.memberToDelete = member;
    this.deleteModal = true;
  }

  closeDeleteModal() {
    this.deleteModal = false;
    this.memberToDelete = null;
  }

  openProfileModal() { this.isProfileOpen = true; }
  closeProfileModal() { this.isProfileOpen = false; }
  openAddMemberModal() { this.addMemberModal = true; }

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
}