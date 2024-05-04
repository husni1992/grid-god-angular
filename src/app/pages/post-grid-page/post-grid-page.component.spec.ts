import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGridPageComponent } from './post-grid-page.component';

describe('PostGridPageComponent', () => {
  let component: PostGridPageComponent;
  let fixture: ComponentFixture<PostGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostGridPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
