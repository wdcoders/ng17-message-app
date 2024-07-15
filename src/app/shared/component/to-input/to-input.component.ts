import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { IUser } from '../../../core/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './to-input.component.html',
  styleUrl: './to-input.component.scss',
})
export class ToInputComponent implements ControlValueAccessor {
  @Input() users: IUser[] | null = null;
  @Input() customClass: any = null;
  @Input() placeholder: string = '';
  @Output() selectedData = new EventEmitter();
  input: string = '';

  filteredData: IUser[] | null = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(input: any): void {
    this.input = input;
    console.log(input);

    this.onChange(input);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  selectedUser(user: IUser) {
    // console.log(user);

    this.selectedData.emit(user);
    this.writeValue(user.email);
    this.filteredData = [];
  }

  filterData() {
    if (this.input) {
      this.filteredData =
        this.users?.filter(
          (u) =>
            u.name.toLowerCase().startsWith(this.input.toLowerCase()) ||
            u.email.toLowerCase().startsWith(this.input.toLowerCase())
        ) || null;
    } else {
      this.filteredData = [];
    }
  }
}
