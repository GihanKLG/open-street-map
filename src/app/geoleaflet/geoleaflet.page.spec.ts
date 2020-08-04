import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeoleafletPage } from './geoleaflet.page';

describe('GeoleafletPage', () => {
  let component: GeoleafletPage;
  let fixture: ComponentFixture<GeoleafletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoleafletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeoleafletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
