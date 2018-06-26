import Stepper from '../../../components/stepper/stepper';

describe('Stepper: getValue', () => {
  it('should return correct value', () => {
    const prototype = {
      state: {
        currentValue: 1,
      },
    };

    const value = Stepper.prototype.getValue.call(prototype);
    expect(value).toBe(1);
  });
});
