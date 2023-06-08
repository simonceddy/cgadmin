import {
  Children, cloneElement, isValidElement, useRef
} from 'react';
import { CSSTransition as RCSSTransition } from 'react-transition-group';

export default function CSSTransition({ children, ...props }) {
  const nodeRef = useRef(null);

  return (
    <RCSSTransition {...props} nodeRef={nodeRef}>
      <>
        {Children.map(children, (child) => (isValidElement(child)
          ? cloneElement(child, { ref: nodeRef })
          : child))}
      </>
    </RCSSTransition>
  );
}
