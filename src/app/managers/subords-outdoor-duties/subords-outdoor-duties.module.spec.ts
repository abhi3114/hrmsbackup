import { SubordsOutdoorDutiesModule } from './subords-outdoor-duties.module';

describe('SubordsOutdoorDutiesModule', () => {
  let subordsOutdoorDutiesModule: SubordsOutdoorDutiesModule;

  beforeEach(() => {
    subordsOutdoorDutiesModule = new SubordsOutdoorDutiesModule();
  });

  it('should create an instance', () => {
    expect(subordsOutdoorDutiesModule).toBeTruthy();
  });
});
