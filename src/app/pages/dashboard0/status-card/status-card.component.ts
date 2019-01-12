import { Component,OnChanges ,Input,Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="clicked()" [ngClass]="{'off': !on}" >

      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? onText : offText }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {


  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() onText = 'ON';
  @Input() offText = 'OFF';
  @Output('state') state = new EventEmitter<Boolean>();

  clicked(){this.on = !this.on; this.state.emit(this.on);}
}
