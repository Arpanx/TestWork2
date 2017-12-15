import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

import { MatMenuTrigger, MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-contextmenu',
    templateUrl: 'contextmenu.component.html',
    styleUrls: ['contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit, OnDestroy {
    @Input() x = 0;
    @Input() y = 0;
    @Input() parentSubject: Subject<any>;

    @Output()  change: EventEmitter<number> = new EventEmitter<number>();
    @Output()  deleteTask: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild(MatMenuTrigger) menu: MatMenuTrigger;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('img/thumbup-icon.svg'));
      }

    ngOnInit() {
        this.parentSubject.subscribe(() => {  // event
            // console.log(event)
            this.menu.openMenu();
            // called when the notifyChildren method is
            // called in the parent component
        });
    }

    sendEventToParentForHideMenu(event: any) { // event
        console.log(event);
        this.change.emit(1);
    }

    deleteCurrentTask() {
      this.deleteTask.emit(1);
    }

    ngOnDestroy() {
        // needed if child gets re-created (eg on some model changes)
        // note that subsequent subscriptions on the same subject will fail
        // so the parent has to re-create parentSubject on changes
        this.parentSubject.unsubscribe();
    }
}
