import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewitemPage } from './viewitem.page';

describe('ViewitemPage', () => {
  let component: ViewitemPage;
  let fixture: ComponentFixture<ViewitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewitemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
