import { Component } from '@angular/core';
console.assert(Component, 'Uhoh, Something was not defined, likely part of a circular reference loop');

@Component({

    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent  {
    formButtonXs = true;
}

