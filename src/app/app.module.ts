import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaComponent } from './components/noticias/noticia/noticia.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventoComponent } from './components/eventos/evento/evento.component';
import { EventoHeaderComponent } from './components/eventos/evento/evento-header/evento-header.component';
import { EventoBodyComponent } from './components/eventos/evento/evento-body/evento-body.component';
import { EventoAccessComponent } from './components/eventos/evento/evento-access/evento-access.component';
import { MyAccountComponent } from './components/header/my-account/my-account.component';
import { WellnessComponent } from './components/header/wellness/wellness.component';
import { MyEventsComponent } from './components/header/my-events/my-events.component';
import { MyInvitationsComponent } from './components/header/my-invitations/my-invitations.component';
import { LogoutComponent } from './components/header/logout/logout.component';


const routes: Routes = [
	{ path: '', component: LoginComponent},
	{ path: 'registro', component: RegisterComponent},
  { path: 'recuperar', component: RecoveryComponent},
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: MyAccountComponent },
  { path: 'bienestar', component: WellnessComponent },
  { path: 'mis-eventos', component: MyEventsComponent },
  { path: 'mis-invitaciones', component: MyInvitationsComponent },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    DatePickerComponent,
    ModalComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    NoticiasComponent,
    NoticiaComponent,
    EventosComponent,
    EventoComponent,
    EventoHeaderComponent,
    EventoBodyComponent,
    EventoAccessComponent,
    MyAccountComponent,
    WellnessComponent,
    MyEventsComponent,
    MyInvitationsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
