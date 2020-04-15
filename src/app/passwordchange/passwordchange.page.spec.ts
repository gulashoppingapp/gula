import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasswordchangePage } from './passwordchange.page';

describe('PasswordchangePage', () => {
  let component: PasswordchangePage;
  let fixture: ComponentFixture<PasswordchangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordchangePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordchangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
