import { SubordsLeavesModule } from './subords-leaves.module';

describe('SubordsLeavesModule', () => {
  let subordsLeavesModule: SubordsLeavesModule;

  beforeEach(() => {
    subordsLeavesModule = new SubordsLeavesModule();
  });

  it('should create an instance', () => {
    expect(subordsLeavesModule).toBeTruthy();
  });
});
