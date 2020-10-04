import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-plate',
  templateUrl: './user-plate.component.html',
  styleUrls: ['./user-plate.component.scss']
})
export class UserPlateComponent implements OnInit {

  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>()

  imageSource: string = './assets/images/user.png'
  isAuthorized: boolean
  userBtnToggle: boolean = false

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.isAuthorized = this.auth.isAuthorized()
    this.auth.token$.subscribe(() => {
      this.isAuthorized = this.auth.isAuthorized()
    })
  }

  showAuthModal() {
    this.dataChanged.emit({showAuthModal: true})
  }

}
