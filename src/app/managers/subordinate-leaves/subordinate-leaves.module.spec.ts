import { SubordinateLeavesModule } from './subordinate-leaves.module';

describe('SubordinateLeavesModule', () => {
  let subordinateLeavesModule: SubordinateLeavesModule;

  beforeEach(() => {
    subordinateLeavesModule = new SubordinateLeavesModule();
  });

  it('should create an instance', () => {
    expect(subordinateLeavesModule).toBeTruthy();
  });
});
