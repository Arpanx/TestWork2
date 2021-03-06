import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { ClientModule } from './+client/client.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        // BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        SharedModule,
        CoreModule.forRoot(),
        ClientModule
    ],

    declarations: [
        AppComponent
    ],

    bootstrap: [AppComponent],
})

export class AppModule {

}

