import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-conversions-list',
  templateUrl: './conversions-list.component.html',
  styleUrls: ['./conversions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionsListComponent implements OnInit, OnChanges {

  @Input() public conversion: any;
  public recentConversions: any[] = []
    
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['conversion'].firstChange) {
      const conversion = changes['conversion'].currentValue;
      this.recentConversions.unshift(conversion)
      this.recentConversions = this.recentConversions.splice(0, 3)
    }
  }

  trackByFn(index: number) {
    return index;
  }

  ngOnInit() { }

}
