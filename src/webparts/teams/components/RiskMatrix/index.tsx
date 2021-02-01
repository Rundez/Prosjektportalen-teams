import * as React from 'react';
import { IRiskMatrixProps, RiskElementModel } from './types';
import { MatrixRows } from './MatrixRow';
import styles from './RiskMatrix.module.scss';
import * as getValue from 'get-value';
import { Loader, Divider } from '@fluentui/react-northstar';
import { AddElementDialog } from './DialogPopup/index';
import { DisplayTable } from './DisplayTable/index';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


export const RiskMatrix: React.FunctionComponent<IRiskMatrixProps> = ({
  //items = [],
  width = 400,
  height = 300,
  calloutTemplate,
  listName
}: IRiskMatrixProps) => {

  const [data, setData] = React.useState<RiskElementModel[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    _getItems();
  }, []);

  async function _getItems() {
    let data = await sp.web.lists
      .getByTitle(listName).items.get();

    data = data.map((i) =>
      new RiskElementModel(
        i,
        getValue(i, "GtRiskProbability", { default: '' }),
        getValue(i, "GtRiskConsequence", { default: '' }),
        getValue(i, "GtRiskProbabilityPostAction", { default: '' }),
        getValue(i, "GtRiskConsequencePostAction", { default: '' })
      )
    )
    setData(data);
    setLoading(false);
  }
  console.log(data);


  return (
    <> 
      {isLoading ? <Loader label="Content loading" /> :
      <div style={{width: width, height: height}}>
        <div className={styles.riskMatrix}>
          <table className={styles.table}>
            <tbody>
              <MatrixRows items={data} calloutTemplate={calloutTemplate} />
            </tbody>
          </table>
          <Divider />
          <AddElementDialog />
          <DisplayTable />

        </div>
        </div>
      }
    </>
  )
}

const header = {
  items: ['id', 'Name', 'Picture', 'Age'],
};
const rows = [
  {
    key: 1,
    items: ['1', 'Roman van von der Longername', 'None', '30 years'],
  },
  {
    key: 2,
    items: ['2', 'Alex', 'None', '1 year'],
  },
  {
    key: 3,
    items: ['3', 'Ali', 'None', '30000000000000 years'],
  },
];



export * from './types'
