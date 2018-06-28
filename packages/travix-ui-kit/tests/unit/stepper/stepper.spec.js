import { shallow } from 'enzyme';
import React from 'react';
import Stepper from '../../../components/stepper/stepper';

const event = {
  preventDefault: jest.fn(),
};

describe('Stepper', () => {
  describe('#render()', () => {
    it('should render component', () => {
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
      const wrapper = shallow(
        <Stepper
          initValue={2}
        />
      );

      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ initValue: 4 });
      expect(wrapper).toMatchSnapshot();
    });

    it('should keep state after props update', () => {
      const wrapper = shallow(
        <Stepper
          initValue={2}
        />
      );

      expect(wrapper).toMatchSnapshot();
      wrapper.setProps({ initValue: 2 });
      expect(wrapper).toMatchSnapshot();
    });

    it('should decrement value (2 -> 1)', () => {
      const wrapper = shallow(
        <Stepper
          initValue={2}
          maxValue={5}
          minValue={1}
        />
      );

      wrapper.find('.ui-stepper__button-decrease').simulate('click', event);
      expect(wrapper).toMatchSnapshot();
    });

    it('should not decrement value (1 -> 1)', () => {
      const wrapper = shallow(
        <Stepper
          initValue={1}
          maxValue={5}
          minValue={1}
        />
      );

      wrapper.find('.ui-stepper__button-decrease').simulate('click', event);
      expect(wrapper).toMatchSnapshot();
    });

    it('should increment value (2 -> 3)', () => {
      const wrapper = shallow(
        <Stepper
          initValue={2}
          maxValue={5}
          minValue={1}
        />
      );

      wrapper.find('.ui-stepper__button-increase').simulate('click', event);
      expect(wrapper).toMatchSnapshot();
    });

    it('should not increment value (5 -> 5)', () => {
      const wrapper = shallow(
        <Stepper
          initValue={5}
          maxValue={5}
          minValue={1}
        />
      );

      wrapper.find('.ui-stepper__button-increase').simulate('click', event);
      expect(wrapper).toMatchSnapshot();
    });

    it('should call callback after value changed', () => {
      const callback = jest.fn();
      const wrapper = shallow(
        <Stepper
          initValue={1}
          maxValue={5}
          minValue={1}
          onChange={callback}
        />
      );

      wrapper.find('.ui-stepper__button-increase').simulate('click', event);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(2);
    });

    it('should not call callback if value is not changed', () => {
      const callback = jest.fn();
      const wrapper = shallow(
        <Stepper
          initValue={5}
          maxValue={5}
          minValue={1}
          onChange={callback}
        />
      );

      wrapper.find('.ui-stepper__button-increase').simulate('click', event);
      expect(callback).toHaveBeenCalledTimes(0);
    });
  });
});
