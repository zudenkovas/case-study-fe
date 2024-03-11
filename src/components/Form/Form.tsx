'use client';

import { ReactNode, RefObject, useImperativeHandle, useRef } from 'react';
import { FieldValues, Resolver, SubmitHandler, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export type FormInnerRef = {
  submitForm?: () => void;
};

type FormProps<T extends FieldValues = {}> = {
  onSubmit: SubmitHandler<T>;
  children: (form: UseFormReturn<T>) => ReactNode;
  innerRef?: RefObject<FormInnerRef>;
  validationSchema?: Yup.ObjectSchema<T>;
} & UseFormProps<T>;

export const Form = <T extends FieldValues = {}>({
  onSubmit,
  children,
  innerRef,
  validationSchema,
  ...rest
}: FormProps<T>) => {
  const form = useForm<T>({
    ...rest,
    resolver: validationSchema && (yupResolver(validationSchema) as unknown as Resolver<T, any>),
  });
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(
    innerRef,
    () => ({
      submitForm: () => formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })),
    }),
    []
  );

  return (
    <form ref={formRef} noValidate onSubmit={form.handleSubmit(onSubmit)}>
      {children(form)}
    </form>
  );
};
