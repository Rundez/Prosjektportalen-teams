import { Callout } from 'office-ui-fabric-react/lib/Callout'
import React, { FunctionComponent } from 'react'
import { IRiskElementCalloutProps } from './types'
import { ITypedHash } from '@pnp/common'


export const RiskElementCallout: FunctionComponent<IRiskElementCalloutProps> = ({
  risk,
  calloutTemplate,
  target,
  onDismiss
}: IRiskElementCalloutProps) => {
  const content = "<h3>{Title}</h3><p><strong>Usikkerhetstrategi: </strong>{GtRiskStrategy}</p><p><strong>Nærhet: </strong>{GtRiskProximity}</p><p><strong>Status usikkerhet: </strong>{GtRiskStatus}</p>";

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