import { ManagersModule } from './managers.module';

describe('ManagersModule', () => {
  let managersModule: ManagersModule;

  beforeEach(() => {
    managersModule = new ManagersModule();
  });

  it('should create an instance', () => {
    expect(managersModule).toBeTruthy();
  });
});
