import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { ariaAttr, dataAttr } from '@zag-js/dom-query';
import { useEnvironmentContext } from '@/utils/hooks/useEnvironmentContext';
import type { DefaultHTMLProps, HTMLProps } from '@/utils/factory';
import { parts } from './anatomy';
import type { Parts } from './anatomy';
import { mergeProps } from '@/utils/mergeProps';

type PartsRecord<T> = {
  [K in Parts]?: T;
};

type InputType =
  | 'date'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'datetime-local'
  | 'week';

export interface UseFieldServiceProps {
  id?: string;
  ids?: PartsRecord<string>;
  classNames?: PartsRecord<string>;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  valid?: boolean;
  readOnly?: boolean;
  type?: InputType;
}

export const propKeys = [
  'id',
  'ids',
  'required',
  'disabled',
  'invalid',
  'valid',
  'readOnly',
  'type',
] as const;

export const useFieldService = (props: UseFieldServiceProps) => {
  const {
    ids = {},
    classNames = {},
    disabled = false,
    invalid = false,
    valid = false,
    readOnly = false,
    required = false,
    type = 'text',
  } = props;

  const env = useEnvironmentContext();
  const uid = useId();
  const id = props.id ?? uid;
  const rootId = ids.root ?? `field::${id}`;
  const labelId = ids.label ?? `field::${id}::label`;
  const errorTextId = ids.errorText ?? `field::${id}::error-text`;
  const passwordControlId = ids.passwordControl ?? `field::${id}::password-control`;
  const helperId = ids.helper ?? `field::${id}::helper`;
  const prefixId = ids.prefix ?? `field::${id}::prefix`;
  const suffixId = ids.suffix ?? `field::${id}::suffix`;
  const wrapperId = ids.wrapper ?? `field::${id}::wrapper`;

  const [hasNode, setHasNode] = useState({
    errorText: false,
    helper: false,
    prefix: false,
    suffix: false,
    passwordControl: false,
    wrapper: false,
  });
  const rootRef = useRef<HTMLDivElement>(null);

  const [passwordInputType, setPasswordInputType] = useState<'text' | 'password'>('password');
  const isPasswordVisible = passwordInputType === 'text';

  const labelIds = useMemo(() => {
    const ids: string[] = [];
    const { errorText, helper, prefix, suffix } = hasNode;
    if (errorText && invalid) ids.push(errorTextId);
    if (helper) ids.push(helperId);
    if (prefix) ids.push(prefixId);
    if (suffix) ids.push(suffixId);
    return ids.join(' ') || undefined;
  }, [hasNode, invalid, errorTextId, helperId, prefixId, suffixId]);

  useEffect(() => {
    const rootNode = rootRef.current;
    if (!rootNode) return;

    const checkTextElements = () => {
      const docOrShadowRoot = env.getRootNode() as ShadowRoot | Document;
      setHasNode({
        errorText: !!docOrShadowRoot.getElementById(errorTextId),
        helper: !!docOrShadowRoot.getElementById(helperId),
        prefix: !!docOrShadowRoot.getElementById(prefixId),
        suffix: !!docOrShadowRoot.getElementById(suffixId),
        passwordControl: !!docOrShadowRoot.getElementById(passwordControlId),
        wrapper: !!docOrShadowRoot.getElementById(wrapperId),
      });
    };

    checkTextElements();

    const win = env.getWindow();
    const observer = new win.MutationObserver(checkTextElements);
    observer.observe(rootNode, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [env, errorTextId, helperId, passwordControlId, prefixId, suffixId, wrapperId]);

  const getRootProps = useCallback(
    (overrides?: HTMLProps<'div'>) => ({
      ...parts.root.attrs,
      id: rootId,
      ref: rootRef,
      role: 'group',
      'data-disabled': dataAttr(disabled),
      'data-invalid': dataAttr(invalid),
      'data-valid': dataAttr(valid),
      'data-readonly': dataAttr(readOnly),
      ...overrides,
    }),
    [rootRef, disabled, invalid, valid, readOnly, rootId],
  );

  const getControlProps = useCallback(
    (overrides?: React.HTMLProps<any>) =>
      ({
        id,
        'aria-describedby': labelIds,
        'aria-invalid': ariaAttr(invalid),
        'data-disabled': dataAttr(disabled),
        'data-invalid': dataAttr(invalid),
        'data-valid': dataAttr(valid),
        'data-required': dataAttr(required),
        'data-readonly': dataAttr(readOnly),
        required,
        disabled,
        readOnly,
        ...overrides,
      }) as React.HTMLProps<any>,
    [labelIds, invalid, required, readOnly, id, disabled],
  );

  const getLabelProps = useCallback(
    (overrides?: HTMLProps<'label'>) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.label.attrs,
          id: labelId,
          htmlFor: id,
          className: classNames.label,
        },
        { ...overrides },
      ),
    [getControlProps, labelId, id],
  );

  const getInputProps = useCallback(
    (overrides?: HTMLProps<'input'>) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.input.attrs,
          type: type === 'password' ? passwordInputType : type,
          className: classNames.input,
        },
        { ...overrides },
      ),
    [getControlProps, passwordInputType, type],
  );

  const getTextareaProps = useCallback(
    (overrides?: HTMLProps<'textarea'>) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.textarea.attrs,
          className: classNames.textarea,
        },
        { ...overrides },
      ),
    [getControlProps],
  );

  const getSelectProps = useCallback(
    (overrides?: HTMLProps<'select'>) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.select.attrs,
          className: classNames.select,
        },
        { ...overrides },
      ),
    [getControlProps],
  );

  const getHelperProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.helper.attrs,
          id: helperId,
          className: classNames.helper,
        },
        { ...overrides },
      ),
    [getControlProps, helperId],
  );

  const getPrefixProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.prefix.attrs,
          id: prefixId,
          className: classNames.prefix,
        },
        { ...overrides },
      ),
    [getControlProps, prefixId],
  );

  const getSuffixProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.suffix.attrs,
          id: suffixId,
          className: classNames.suffix,
        },
        { ...overrides },
      ),
    [getControlProps, suffixId],
  );

  const getErrorTextProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps>(
        {
          ...getControlProps(),
          ...parts.errorText.attrs,
          id: errorTextId,
          'aria-live': 'polite',
          hidden: !invalid,
          className: classNames.errorText,
        },
        { ...overrides },
      ),
    [getControlProps, errorTextId, invalid],
  );

  const getWrapperProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.wrapper.attrs,
          id: wrapperId,
          className: classNames.wrapper,
        },
        { ...overrides },
      ),
    [getControlProps, wrapperId],
  );

  const togglePasswordVisibility = useCallback(() => {
    setPasswordInputType((prev) => (prev === 'text' ? 'password' : 'text'));
  }, []);

  const getPasswordControlProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps(
        {
          ...getControlProps(),
          ...parts.passwordControl.attrs,
          id: passwordControlId,
          role: 'button',
          tabIndex: -1,
          'aria-label': isPasswordVisible ? 'Hide password' : 'Show password',
          onClick: togglePasswordVisibility,
          className: classNames.passwordControl,
        },
        { ...overrides },
      ),
    [getControlProps, isPasswordVisible, passwordControlId],
  );

  return {
    isPasswordVisible,
    togglePasswordVisibility,
    // Getters for various parts of the field
    getRootProps,
    getLabelProps,
    getErrorTextProps,
    getPasswordControlProps,
    getWrapperProps,
    getHelperProps,
    getPrefixProps,
    getSuffixProps,
    getControlProps,
    getInputProps,
    getTextareaProps,
    getSelectProps,
  };
};

export type UseFieldServiceReturn = ReturnType<typeof useFieldService>;
