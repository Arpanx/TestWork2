import { TaskClientService } from '../core/services/taskclient-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { clientComponent } from './client.component';
import { clientRoutes } from './client.routes';
import { MatButtonModule, MatSidenavModule, MatCheckboxModule,
         MatSortModule, MatAutocompleteModule, MatMenuModule, MatPaginatorModule,
         MatProgressSpinnerModule, MatToolbarModule, MatDialogModule, MatIconModule,
         MatGridListModule, // MatIconRegistry,
         MatTableModule, MatSelectModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { MessageService } from './services/index';
import { ListClientTasksComponent } from './list-client-tasks/list-client-tasks.component';
import { ContextmenuComponent } from './contextmenu/contextmenu.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        clientRoutes,
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
        clientComponent,
        ListClientsComponent,
        ListClientTasksComponent,
        ContextmenuComponent
    ],
    providers: [
        MessageService,
        TaskClientService,
      ],
    exports: [
        ListClientTasksComponent,
        ContextmenuComponent
    ]
})

export class clientModule {
}