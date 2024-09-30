import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.css'
})
export class RolesModalComponent {
  bsModelRef = inject(BsModalRef);
  title = '';
  username = '';
  availableRoles: string[] = [];
  selectedRoles: string[] = [];
  roleUpdated = false;

  updateChecked(checkedValue: string) {
    if (this.selectedRoles.includes(checkedValue)) {
      this.selectedRoles = this.selectedRoles.filter(r => r !== checkedValue);
    }
    else {
      this.selectedRoles.push(checkedValue);
    }
  }

  onSelectRole() {
    this.roleUpdated = true;
    this.bsModelRef.hide();
  }
}
