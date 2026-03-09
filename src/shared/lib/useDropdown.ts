import { useState } from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  Placement,
  Middleware,
  useFloating,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";

type TProps = {
  placement?: Placement;
  offsetValue?: number;
  middleware?: Middleware[];
};

export const useDropdown = ({
  placement = "bottom",
  offsetValue = 8,
  middleware = [],
}: TProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip(),
      shift(),
      ...middleware,
    ],
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } =
    useInteractions([dismiss]);

  return {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  };
};
