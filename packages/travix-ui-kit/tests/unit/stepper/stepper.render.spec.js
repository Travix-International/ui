import { shallow } from 'enzyme';
import React from 'react';
import Stepper from '../../../components/stepper/stepper';

describe('Stepper', () => {
  describe('#render()', () => {
    it('should render', () => {
      const wrapper = shallow(
        <Stepper
          initValue={2}
          minValue={1}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with disabled decrement button', () => {
      const wrapper = shallow(
        <Stepper
          initValue={1}
          minValue={1}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with disabled increment button', () => {
      const wrapper = shallow(
        <Stepper
          initValue={3}
          maxValue={3}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should change state after props update', () => {
      const component = shallow(
        <Stepper
          initValue={2}
        />
      );
      expect(component.state().currentValue).toBe(2);
      component.setProps({ initValue: 4 });
      expect(component.state().currentValue).toBe(4);
    });

    it('should change state after props update', () => {
      const component = shallow(
        <Stepper
          initValue={2}
        />
      );
      component.instance().setState = jest.fn();
      component.setProps({ initValue: 2 });

      expect(component.instance().setState).toHaveBeenCalledTimes(0);
    });
  });
});
