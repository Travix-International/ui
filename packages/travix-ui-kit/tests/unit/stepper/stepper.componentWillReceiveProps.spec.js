import Stepper from '../../../components/stepper/stepper';

describe('Stepper: componentWillReceiveProps', () => {
  it('should not call setState', () => {
    const prototype = {
      setState: jest.fn(),
      props: {
        minValue: 1,
        maxValue: 10,
      },
      state: {
        currentValue: 1,
      },
    };
    const nextProps = {
      initValue: 1,
    };

    Stepper.prototype.componentWillReceiveProps.call(prototype, nextProps);
    expect(prototype.setState).toHaveBeenCalledTimes(0);
  });

  it('should call setState', () => {
    const prototype = {
      setState: jest.fn(),
      props: {
        minValue: 1,
        maxValue: 10,
      },
      state: {
        currentValue: 1,
      },
    };
    const nextProps = {
      initValue: 3,
    };

    Stepper.prototype.componentWillReceiveProps.call(prototype, nextProps);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 3 });
  });

  it('should call setState with minValue', () => {
    const prototype = {
      setState: jest.fn(),
      props: {
        minValue: 1,
        maxValue: 10,
      },
      state: {
        currentValue: 2,
      },
    };
    const nextProps = {
      initValue: 0,
    };

    Stepper.prototype.componentWillReceiveProps.call(prototype, nextProps);
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
      state: {
        currentValue: 2,
      },
    };
    const nextProps = {
      initValue: 11,
    };

    Stepper.prototype.componentWillReceiveProps.call(prototype, nextProps);
    expect(prototype.setState).toHaveBeenCalledTimes(1);
    expect(prototype.setState.mock.calls[0][0]).toEqual({ currentValue: 10 });
  });
});
