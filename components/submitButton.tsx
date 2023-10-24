"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  name: string;
  text: string;
};

export function SubmitButton({ text, name, ...rest }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} name={name} type="submit" aria-disabled={pending}>
      {text}
    </Button>
  );
}
