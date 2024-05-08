import { TestBed } from '@angular/core/testing';

import { PostCardService } from './post.service';
import { HttpClientModule } from '@angular/common/http';

describe('PostService', () => {
  let service: PostCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PostCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
