import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  @Input()
  group: FormGroup;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  control: AbstractControl;

  ngOnInit(): void {
    this.control = this.group.get(this.name);
  }

  reset() {
    this.control.reset();
  }
}
