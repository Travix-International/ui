import Stepper from '../../../components/stepper/stepper';

describe('Stepper: tryDecreaseValue', () => {
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

    Stepper.prototype.tryDecreaseValue.call(prototype, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(prototype.validationFn).toHaveBeenCalledTimes(1);
    expect(prototype.validationFn).toHaveBeenCalledWith(prototype, 0);
  });
});
