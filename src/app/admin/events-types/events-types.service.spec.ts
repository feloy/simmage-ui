/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsTypesService } from './events-types.service';
import { Observable } from 'rxjs/Observable';
import { PgService } from '../../pg.service';
import { UserService } from '../../shared/user.service';

class FakeUserService {
  public userData: any = { token: 123456789 };
}

// TODO : replace all "schema" occurences by the correct emplacement

describe('Service: EventsTypes', () => {

  const fakePgService = jasmine.createSpyObj('PgService', ['pgcall']);
  const fakeUserService = new FakeUserService();
  const userToken = 123456789;
  const data = [
    {
      ety_id: 1,
      ety_name: 'a name'
    },
    {
      ety_id: 3,
      ety_name: 'another name'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventsTypesService,
        { provide: UserService, useValue: fakeUserService },
        { provide: PgService, useValue: fakePgService }
      ]
    });
  });

  it('should return an Observable of type events-types', inject([EventsTypesService], (service: EventsTypesService) => {
    const eventsTypes = {
      ety_id: 1,
      ety_name: 'a name'
    };

    const eventsTypesId = 1;

    fakePgService.pgcall.and.returnValue(Observable.of(eventsTypes));

    service.getEventsTypes(eventsTypesId).subscribe(obj => {
      expect(fakePgService.pgcall).toHaveBeenCalledWith('events/event_type_get', {
        prm_token: userToken,
        prm_ety_id: 1
      });
    });
  }));

  it('should return a number which is the id of the new events-types', inject([EventsTypesService], (service: EventsTypesService) => {
     const eventsTypesName = 'a name';
     // TODO : declare all other fields of eventsTypes object

     fakePgService.pgcall.and.returnValue(Observable.of(1));

     service.addEventsTypes(eventsTypesName /* TODO : fill with other necessary arguments */).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/event_type_add', {
        prm_token: userToken,
        prm_category: 'incident',
        prm_name: eventsTypesName,
        prm_individual_name: false
      });
     });
   }));

   it('should return a boolean when we update events-types object', inject([EventsTypesService], (service: EventsTypesService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const eventsTypesId = 1;
     const eventsTypesName = 'EventsTypes';
     // TODO : declare all other fields of eventsTypes object

     service.updateEventsTypes(eventsTypesId, eventsTypesName /* TODO : fill with other necessary arguments */).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/event_type_update', {
        prm_token: userToken,
        prm_ety_id: 1,
        prm_category: 'incident',
        prm_name: eventsTypesName,
        prm_individual_name: false
      });
     });
   }));

   it('should return a boolean when deleting events-types object', inject([EventsTypesService], (service: EventsTypesService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(true));

     const eventsTypesId = 1;

     service.deleteEventsTypes(eventsTypesId).subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/event_type_delete', {
        prm_token: userToken,
        prm_ety_id: 1
      });
     });
   }));

   it('should return a list of 2 events-types objects by default', inject([EventsTypesService], (service: EventsTypesService) => {
     fakePgService.pgcall.and.returnValue(Observable.of(data));

     service.loadEventsTypes().subscribe(obs => {
       expect(fakePgService.pgcall).toHaveBeenCalledWith('events/event_type_list', {
        prm_token: userToken,
        prm_category: null
      });
     });
   }));
});