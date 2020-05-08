import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CulstermapPage } from './culstermap.page';

describe('CulstermapPage', () => {
  let component: CulstermapPage;
  let fixture: ComponentFixture<CulstermapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulstermapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CulstermapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
