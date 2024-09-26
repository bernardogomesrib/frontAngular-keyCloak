import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ButtonAngular',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = '';

  @Output() onClick = new EventEmitter<void>();

  handleClick(event:any) {
    this.onClick.emit(event);
  }

}
