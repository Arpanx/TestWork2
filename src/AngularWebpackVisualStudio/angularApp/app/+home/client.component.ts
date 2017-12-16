import { Component } from '@angular/core';
console.assert(Component, 'Uhoh, Something was not defined, likely part of a circular reference loop');

@Component({

    selector: 'app-client',
    templateUrl: 'client.component.html',
    styleUrls: ['client.component.scss'],
})
export class ClientComponent  {
    formButtonXs = true;
}

