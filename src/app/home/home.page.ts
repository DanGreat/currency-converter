import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public conversion: any[] = [];
  constructor() {}

  saveRecentTransactions(conversion: any) {
    this.conversion = conversion;
  }
}
