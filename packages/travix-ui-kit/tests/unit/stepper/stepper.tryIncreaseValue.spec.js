import Stepper from '../../../components/stepper/stepper';

describe('Stepper: tryIncreaseValue', () => {
  it('should call validate function and prevent default event', () => {
    const prototype = {
      validationFn: jest.fn(),
      state: {
        currentValue: 1,
      },
    };
    const event = {
      preventDefault: jest.fn(),
    };

    Stepper.prototype.tryIncreaseValue.call(prototype, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(prototype.validationFn).toHaveBeenCalledTimes(1);
    expect(prototype.validationFn).toHaveBeenCalledWith(prototype, 2);
  });
});
