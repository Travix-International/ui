import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { getDataAttributes } from '../../_helpers';

const leftBlock = (
  backButtonLabel,
  renderLeftBlock,
  onBackButtonClick,
  useDefaultLeftBlock,
) => {
  const defaultProps = {
    className: "ui-sliding-panel-header__left-block-back",
    onClick: onBackButtonClick,
  };

  if (renderLeftBlock) {
    return renderLeftBlock(defaultProps);
  }

  if (useDefaultLeftBlock) {
    return (
      <button {...defaultProps}>
        <span className="ui-sliding-panel-header__left-block-back-icon" />

        { backButtonLabel && (
          <span className="ui-sliding-panel-header__left-block-back-text">
            {backButtonLabel}
          </span>
        ) }
      </button>
    );
  }

  return null;
};

const rightBlock = (renderRightBlock) => {
  const defaultProps = {
    className: "ui-sliding-panel-header__close-button",
    'data-rel': "close",
  };

  if (renderRightBlock) {
    return renderRightBlock(defaultProps);
  }

  return (
    <button {...defaultProps}>
      &#215;
    </button>
  );
};

const SlidingPanelHeader = ({
  backButtonLabel,
  children,
  className,
  dataAttrs,
  renderLeftBlock,
  onBackButtonClick,
  renderRightBlock,
  useDefaultLeftBlock,
}) => {
  if (!children) {
    return null;
  }

  const headerClassName = classnames('ui-sliding-panel-header', className);

  return (
    <div
      className={headerClassName}
      {...getDataAttributes(dataAttrs)}
    >
      <div className="ui-sliding-panel-header__left-block">
        {
          leftBlock(
            backButtonLabel,
            renderLeftBlock,
            onBackButtonClick,
            useDefaultLeftBlock,
          )
        }
      </div>

      <h3 className="ui-sliding-panel-header__title">
        {children}
      </h3>

      <div className="ui-sliding-panel-header__right-block">
        {rightBlock(renderRightBlock)}
      </div>
    </div>
  );
};

SlidingPanelHeader.propTypes = {
  /**
   * The text for default back button that will appear near the arrow icon
   */
  backButtonLabel: PropTypes.node,

  /**
   * Content, that will be wrapped by SlidingPanel
   */
  children: PropTypes.node.isRequired,

  /**
   * Attribute used to set specific classes
   */
  className: PropTypes.string,

  /**
   * Data attributes. You can use it to set up any custom data-* attribute
   */
  dataAttrs: PropTypes.object,

  /**
   * When defined, this custom component will appears on the left part of the header
   *
   * Props passed to component
   * @param className {String}
   * @param onClick {Function}
   */
  renderLeftBlock: PropTypes.func,

  /**
   * Callback for back button
   */
  onBackButtonClick: PropTypes.func,

  /**
   * When defined, this custom component will appears on the right part of the header
   *
   * Props passed to component
   * @param className {String}
   * @param 'data-rel' {String}
   */
  renderRightBlock: PropTypes.func,

  /**
   * When true, it will show the block with arrow icon and passed text (optional).
   * You can either enable it, or use leftBlock property to have more customization.
   */
  useDefaultLeftBlock: PropTypes.bool,
};

SlidingPanelHeader.defaultProps = {
  useDefaultLeftBlock: false,
};

export default SlidingPanelHeader;
