import Stepper from '../../../components/stepper/stepper';

describe('Stepper: constructor', () => {
  it('should replace validationFn with props version', () => {
    const props = {
      validationFn: jest.fn(),
    };

    const instance = new Stepper(props);
    expect(instance.validationFn).toEqual(props.validationFn);
  });

  it('should still have validationFn method', () => {
    const props = {};

    const instance = new Stepper(props);
    expect(instance.validationFn).toBeInstanceOf(Function);
  });

  it('should have corrent validationFn version', () => {
    const props = {};
    const stepper = {
      setValue: jest.fn(),
    };

    const instance = new Stepper(props);
    expect(instance.validationFn).toBeInstanceOf(Function);

    instance.validationFn(stepper, 3);

    expect(stepper.setValue).toHaveBeenCalledTimes(1);
    expect(stepper.setValue).toHaveBeenCalledWith(3);
  });
});
