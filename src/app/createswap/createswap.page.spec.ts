import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateswapPage } from './createswap.page';

describe('CreateswapPage', () => {
  let component: CreateswapPage;
  let fixture: ComponentFixture<CreateswapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateswapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateswapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
