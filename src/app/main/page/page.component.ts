import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DbMainmenu } from './../../db-models/portal';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  private mainmenu: Observable<DbMainmenu>;
/*
  private dossiersPatientData: Observable<DbDossier[]> = null;
  private dossiersFamilyData: Observable<DbDossier[]> = null;
  private dossiersIndivContactData: Observable<DbDossier[]> = null;
  private dossiersFamilyContactData: Observable<DbDossier[]> = null;
*/
  constructor(private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck<DbMainmenu>('data');
    console.log(this.mainmenu);
/*
    this.subs.push(this.user.userDataState
      .map((u: UserData) => u.selectedGrpId)
      .distinctUntilChanged()
      .subscribe(grpId => this.loadDossiers(grpId)));*/
  }

/*
  private loadDossiers(grpId: number) {
    this.dossiersPatientData = this.dossiers.loadDossiers(false, false, grpId);
    this.dossiersFamilyData = this.dossiers.loadDossiers(true, false, grpId);
    this.dossiersIndivContactData = this.dossiers.loadDossiers(false, true, grpId);
    this.dossiersFamilyContactData = this.dossiers.loadDossiers(true, true, grpId);
  }*/
}
