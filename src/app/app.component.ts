import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  group: FormGroup;

  ngOnInit(): void {
    this.group = new FormGroup({notary: new FormControl(), agency: new FormControl()});
  }

}

