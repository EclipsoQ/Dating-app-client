import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  private adminService = inject(AdminService);
  private modalService = inject(BsModalService);
  users: User[] = [];
  bsModalref: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  ngOnInit(): void {
    this.getUserWithRoles();
  }

  openRolesModal(user: User) {
    const initialState: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        title: 'User roles',
        username: user.username,
        selectedRoles: [...user.roles],
        availableRoles: ['Admin', 'Moderator', 'Member'],
        users: this.users,
        roleUpdated: false
      }
    }
    this.bsModalref = this.modalService.show(RolesModalComponent, initialState);
    this.bsModalref.onHide?.subscribe({
      next: () => {
        if (this.bsModalref.content && this.bsModalref.content.roleUpdated) {
          const selectedRoles = this.bsModalref.content.selectedRoles;
          this.adminService.updateUserRoles(user.username, selectedRoles).subscribe({
            next: roles => user.roles = roles
          })
        }
      }
    })
  }

  getUserWithRoles() {
    this.adminService.getUserWithRoles().subscribe({
      next: users => this.users = users
    })
  }
}
