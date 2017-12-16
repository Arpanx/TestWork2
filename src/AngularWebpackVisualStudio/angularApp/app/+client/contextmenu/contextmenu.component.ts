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
            this.menu.openMenu();
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
        this.parentSubject.unsubscribe();
    }
}
