import { Component } from '@angular/core';
console.assert(Component, 'Uhoh, Something was not defined, likely part of a circular reference loop');
// import { DomSanitizer } from '@angular/platform-browser';
// import { MatIconRegistry } from '@angular/material';


@Component({

    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent  {
    formButtonXs = true;
   // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  //      iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('img/thumbup-icon.svg'));
  //    }

}

