import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  showAuthModal: boolean = false
  constructor() { }

  handleDataChanged(data) {
    if(data.showAuthModal) {
      this.showAuthModal = true
    } else if(data.closeAuthModal) {
      console.log('cloose')
      this.showAuthModal = false
    }
  }

}
