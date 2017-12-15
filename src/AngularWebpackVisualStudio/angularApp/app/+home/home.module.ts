import { TaskClientService } from '../core/services/taskclient-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';
import { MatButtonModule, MatSidenavModule, MatCheckboxModule,
    MatSortModule, MatAutocompleteModule, MatMenuModule, MatPaginatorModule,
    MatProgressSpinnerModule, MatToolbarModule, MatDialogModule, MatIconModule,
    MatGridListModule, // MatIconRegistry,
    MatTableModule,
    MatSelectModule} from '@angular/material';

import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { MessageService } from './services/index';
import { ListClientTasksComponent } from './list-client-tasks/list-client-tasks.component';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';
// import { TaskClientService } from './services/taskClient.service';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { DomSanitizer } from '@angular/platform-browser';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HomeRoutes,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        CdkTableModule,
        MatToolbarModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatGridListModule,
        FlexLayoutModule,
        // MatIconRegistry,
    ],

    declarations: [
        HomeComponent,
        ListClientsComponent,
        ListClientTasksComponent,
        ContextmenuComponent
    ],
    providers: [
        MessageService,
        // TaskClientService,
        TaskClientService,
      ],
    exports: [
        ListClientTasksComponent,
        ContextmenuComponent
    ]
})

export class HomeModule {
  //  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  //      matIconRegistry.addSvgIconSet(
  //        domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
  //      );
  //  }
}
