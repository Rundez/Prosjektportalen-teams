import * as React from 'react';
import { IRiskMatrixProps } from './types'
import { MatrixRows } from './MatrixRow'
import styles from './RiskMatrix.module.scss'

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

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    const data: [] = await sp.web.lists.getByTitle("usikkerhet").items.get();

    setItems(data);
  }
  console.log(items);
  return (
    <div className={styles.riskMatrix} style={{ width, height }}>
      <table className={styles.table}>
        <tbody>
          <MatrixRows items={items} calloutTemplate={calloutTemplate} />
        </tbody>
      </table>
    </div>
  )
}
export * from './types'
