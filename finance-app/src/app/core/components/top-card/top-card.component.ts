import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'fin-top-card',
  templateUrl: './top-card.component.html',
  styleUrl: './top-card.component.scss'
})
export class TopCardComponent {
 @Input() title!: string;
 @Input() icon!: IconProp;
 @Input() value!: number;
 @Input() isCurrency!: boolean;
}
