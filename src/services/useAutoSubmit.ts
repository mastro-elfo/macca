import { useEffect } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  useWatch,
} from "react-hook-form";

export default function useAutoSubmit<T extends FieldValues>(
  form: UseFormReturn<T>,
  submitHandler: SubmitHandler<T>,
  submitErrorHandler: SubmitErrorHandler<T>
) {
  const values = useWatch({
    control: form.control,
  });

  const handleSubmit = form.handleSubmit(submitHandler, submitErrorHandler);

  useEffect(() => {
    void handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
}
