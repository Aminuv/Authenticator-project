import { Directive, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConformedLeavePage($event)'
  }
})
export class SafeLinkDirective {
  queryParamsAdded = input('myapp', { alias: 'appSafeLink' });

  constructor() {
    console.log('SafeLinkDirective initialized');
   }

   onConformedLeavePage(event : MouseEvent) {
    const wantToLeave = window.confirm(
      'The link you clicked may lead to an external site. Do you want to proceed?'
    );
    if (wantToLeave) {
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParamsAdded();
      return;
    }
    event?.preventDefault();
   }

}
 