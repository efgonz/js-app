import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Material Design
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// Modules
import { AppCommonModule } from './directives/directives.module';

// App component and all routing components
import { AppComponent } from './app.component';

// Services
import { AttributesService } from './services/attributes.service';

// Components
import { MainComponent } from './components/main.component';
import { Attribute1Component } from './components/attribute_1/attribute_1.component';
import { Attribute2Component } from './components/attribute_2/attribute_2.component';
import { Attribute3Component } from './components/attribute_3/attribute_3.component';
import { Attribute4Component } from './components/attribute_4/attribute_4.component';
import { Attribute5Component } from './components/attribute_5/attribute_5.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Attribute1Component,
    Attribute2Component,
    Attribute3Component,
    Attribute4Component,
    Attribute5Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppCommonModule
  ],
  providers: [
    AttributesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
