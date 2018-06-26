import Stepper from '../../../components/stepper/stepper';

describe('Stepper: setValue', () => {
  it('should call setState with newValue', () => {
    const prototype = {
      setState: jest.fn(),
      props: {
        minValue: 1,
        maxValue: 10,
      },
    };

    Stepper.prototype.setValue.call(prototype, 2);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 2 });
  });

  it('should call setState with minValue', () => {
    const prototype = {
      setState: jest.fn(),
      props: {
        minValue: 1,
        maxValue: 10,
      },
    };

    Stepper.prototype.setValue.call(prototype, 0);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 1 });
  });

  it('should call setState with maxValue', () => {
    const prototype = {
      setState: jest.fn(),
      props: {
        minValue: 1,
        maxValue: 10,
      },
    };

    Stepper.prototype.setValue.call(prototype, 11);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 10 });
  });

  it('should call setState and fire callback', () => {
    const prototype = {
      setState: jest.fn((state, cb) => cb()),
      props: {
        minValue: 1,
        maxValue: 10,
      },
    };
    const callback = jest.fn();

    Stepper.prototype.setValue.call(prototype, 2, callback);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 2 });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(2);
  });

  it('should call setState and fire callback', () => {
    const prototype = {
      setState: jest.fn((state, cb) => cb()),
      props: {
        minValue: 1,
        maxValue: 10,
      },
    };
    const callback = jest.fn();

    Stepper.prototype.setValue.call(prototype, 2);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 2 });
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
