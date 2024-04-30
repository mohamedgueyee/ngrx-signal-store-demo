import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideHttpClient } from '@angular/common/http';
import { HomePageComponent } from './home-page.component';

bootstrapApplication(HomePageComponent, { providers: [provideHttpClient()] });
