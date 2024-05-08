import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PostCardComponent } from './post-card.component';
import { PostCard } from '../../models/Post.model';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let store: MockStore;
  let fixture: ComponentFixture<PostCardComponent>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // TODO: Ideally the common modules needed for tests have to be moved to a separate state
      imports: [StoreModule.forRoot()],
      declarations: [PostCardComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new active card id if changed', () => {
    component.post = {
      title: 'Initial Title',
      body: 'Updated Content',
      userId: 1,
      id: 123,
    } as PostCard;

    component.activePostCardId = 222;

    // Simulate a click that will change the displayed property
    component.onClick();

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should add "active" class if current card is active', () => {
    component.post = { id: 123 } as PostCard;
    component.activePostCardId = 123;

    expect(component.postCardClasses).toContain('active');
  });

  it('should display next property on click when the card is active', () => {
    component.post = {
      title: 'Initial Title',
      body: 'Updated Content',
      userId: 1,
      id: 123,
    } as PostCard;

    component.activePostCardId = 123;

    component.onClick();

    fixture.detectChanges();

    // Check the actual text content of the component in the DOM
    const displayedText = fixture.nativeElement
      .querySelector('div.post-card-container')
      .textContent.trim();

    expect(displayedText).toBe(component.post.body);
  });

  it('should display next property on click when the card is inactive', () => {
    component.post = {
      title: 'Initial Title',
      body: 'Updated Content',
      userId: 1,
      id: 123,
    } as PostCard;

    component.activePostCardId = 323;

    component.onClick();

    fixture.detectChanges();

    // Check the actual text content of the component in the DOM
    const displayedText = fixture.nativeElement
      .querySelector('div.post-card-container')
      .textContent.trim();

    expect(displayedText).toBe(component.post.body);
  });

  it('should reset display property to title when a different card is clicked', () => {
    component.post = {
      title: 'Initial Title',
      body: 'Updated Content',
      userId: 1,
      id: 123,
    } as PostCard;

    component.activePostCardId = 222;
    component.displayedProperty = 'body';

    // In here we don't simulate click, because some other card is clicked and only the ngOnChanges runs of sef
    component.ngOnChanges();

    fixture.detectChanges();

    // Check the actual text content of the component in the DOM
    const displayedText = fixture.nativeElement
      .querySelector('div.post-card-container')
      .textContent.trim();

    expect(displayedText).toBe(component.post.title);
  });
});
