import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  forwardRef,
} from "react";

interface DynamicHeightTextareaType
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const DynamicHeightTextarea = forwardRef<
  HTMLTextAreaElement,
  DynamicHeightTextareaType
>(({ value, onChange, ...props }: DynamicHeightTextareaType, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust the textarea height
  const adjustHeight = ({ isAuto }: { isAuto?: boolean }) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = isAuto ? "auto" : "1px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Effect to set the ref and adjust the height on mount and value change
  useEffect(() => {
    if (ref && typeof ref === "object" && ref.current !== null) {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
        textareaRef.current;
    }
    adjustHeight({ isAuto: false });
  }, [ref, value]);

  // Adjust the height on the initial mount
  useEffect(() => {
    adjustHeight({ isAuto: false });
  }, []);

  // Handle textarea change event
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight({ isAuto: true });
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      ref={textareaRef}
      {...props}
    />
  );
});

DynamicHeightTextarea.displayName = "DynamicHeightTextarea";

export default DynamicHeightTextarea;
