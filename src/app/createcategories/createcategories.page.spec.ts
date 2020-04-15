import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatecategoriesPage } from './createcategories.page';

describe('CreatecategoriesPage', () => {
  let component: CreatecategoriesPage;
  let fixture: ComponentFixture<CreatecategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecategoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatecategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
