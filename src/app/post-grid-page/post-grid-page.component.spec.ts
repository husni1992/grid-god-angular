import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGridPageComponent } from './post-grid-page.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

describe('PostGridPageComponent', () => {
  let component: PostGridPageComponent;
  let fixture: ComponentFixture<PostGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, StoreModule.forRoot()],
      declarations: [PostGridPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
