import { NullDataPipe } from './null-data.pipe';

describe('NullDataPipe', () => {
  it('create an instance', () => {
    const pipe = new NullDataPipe();
    expect(pipe).toBeTruthy();
  });
});
