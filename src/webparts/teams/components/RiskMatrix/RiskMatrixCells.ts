import { IMatrixCell, MatrixCellType } from './MatrixCell'

const RISK_MATRIX_CELLS: Array<IMatrixCell[]> = [
  [
    {
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    }
  ],
  [
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 1,
      probability: 5
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 2,
      probability: 5
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#ea5c73' },
      consequence: 3,
      probability: 5
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#ea5c73' },
      consequence: 4,
      probability: 5
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#ea5c73' },
      consequence: 5,
      probability: 5
    }
  ],
  [
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 1,
      probability: 4
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 2,
      probability: 4
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 3,
      probability: 4
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#ea5c73' },
      consequence: 4,
      probability: 4
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#ea5c73' },
      consequence: 5,
      probability: 4
    }
  ],
  [
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 1,
      probability: 3
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 2,
      probability: 3
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 3,
      probability: 3
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 4,
      probability: 3
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#ea5c73' },
      consequence: 5,
      probability: 3
    }
  ],
  [
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 1,
      probability: 2
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 2,
      probability: 2
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 3,
      probability: 2
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 4,
      probability: 2
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 5,
      probability: 2
    }
  ],
  [
    {
      cellValue: "strings.RiskMatrix_Header_Insignificant",
      cellType: MatrixCellType.Header,
      className: 'risk-header'
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 1,
      probability: 1
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 2,
      probability: 1
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 3,
      probability: 1
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#2da748' },
      consequence: 4,
      probability: 1
    },
    {
      cellType: MatrixCellType.Cell,
      className: 'risk-matrix-cell',
      style: { backgroundColor: '#e9b359' },
      consequence: 5,
      probability: 1
    }
  ]
]

export default RISK_MATRIX_CELLS
