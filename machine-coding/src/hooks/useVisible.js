import { useCallback, useState } from "react";

export default function useVisible(initiallyVisiblilty = false) {
  const [isVisible, setVisible] = useState(initiallyVisiblilty);
console.log("inside your custom hooks")
  const show = useCallback(() => {
    setVisible(true);
  },[]);

  const toggle = useCallback(() => {
    setVisible((prevVisible) => !prevVisible);
  },[]);

  const hide = useCallback(() => {
    setVisible(false);
  },[]);

  return { isVisible, toggle, hide, show };
}
