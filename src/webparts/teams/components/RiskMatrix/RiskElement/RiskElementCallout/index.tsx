import { Callout } from 'office-ui-fabric-react/lib/Callout'
import * as React from 'react';
import { IRiskElementCalloutProps } from './types'
import { ITypedHash } from '@pnp/common'


export const RiskElementCallout: React.FunctionComponent<IRiskElementCalloutProps> = ({
  risk,
  calloutTemplate,
  target,
  onDismiss
}: IRiskElementCalloutProps) => {
  const content = replaceTokens(calloutTemplate, risk.item)

  return (
    <Callout
      styles={{ root: { minWidth: 250, padding: 10 } }}
      target={target}
      onDismiss={onDismiss}>
      <span dangerouslySetInnerHTML={{ __html: content }}></span>
    </Callout>
  )
}


export function replaceTokens(
  str: string,
  obj: ITypedHash<any>,
  regex: RegExp = /\{[A-Za-z]*\}/gm
): string {
  return str.match(regex).reduce((s, value) => {
    const field = value.substring(1, value.length - 1)
    return s.replace(value, obj[field] || '')
  }, str)
}