import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeafletPage } from './leaflet.page';

describe('LeafletPage', () => {
  let component: LeafletPage;
  let fixture: ComponentFixture<LeafletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeafletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
