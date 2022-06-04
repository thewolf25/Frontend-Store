import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDashchar]'
})
export class DashcharDirective {

  constructor() { }
  @HostBinding('style.height') height="500px";
  @HostBinding('style.width') width="500px";

}
