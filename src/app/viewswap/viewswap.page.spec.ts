import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewswapPage } from './viewswap.page';

describe('ViewswapPage', () => {
  let component: ViewswapPage;
  let fixture: ComponentFixture<ViewswapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewswapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewswapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
