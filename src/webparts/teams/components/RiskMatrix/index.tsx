import * as React from 'react';
import { IRiskMatrixProps, RiskElementModel } from './types'
import { MatrixRows } from './MatrixRow'
import styles from './RiskMatrix.module.scss'
import * as getValue from 'get-value'
import { Loader } from '@fluentui/react-northstar';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


export const RiskMatrix: React.FunctionComponent<IRiskMatrixProps> = ({
  //items = [],
  width = 400,
  height = 300,
  calloutTemplate
}: IRiskMatrixProps) => {

  const [data, setData] = React.useState<RiskElementModel[]>([]);

  React.useEffect(() => {
    _getItems();
  }, []);

  async function _getItems() {
    let data = await sp.web.lists
      .getByTitle("usikkerhet").items.get();

    console.log(data)

    data = data.map(
      (i) =>
        new RiskElementModel(
          i,
          getValue(i, "GtRiskProbability", { default: '' }),
          getValue(i, "GtRiskConsequence", { default: '' }),
          getValue(i, "GtRiskProbabilityPostAction", { default: '' }),
          getValue(i, "GtRiskConsequencePostAction", { default: '' })
        )
    )
    setData(data);
  }


  console.log(data);

  if(data.length < 1) {
    return (<Loader label="Content loading" />)
  } 
  return (
      <div style={{ width: "40%", height: "40%" }}>
        {console.log(data)}
        <div className={styles.riskMatrix} style={{ width, height }}>
          <table className={styles.table}>
            <tbody>
              <MatrixRows items={data} calloutTemplate={calloutTemplate} />
            </tbody>
          </table>
        </div>
      </div>
  )
}



export * from './types'
