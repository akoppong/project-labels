export type LabelPosition = {
  x: number;
  y: number;
};

const AVERY_5160 = {
  columns: 3,
  labelWidthMm: 66.7,
  labelHeightMm: 25.4,
  marginLeftMm: 4.8,
  marginTopMm: 12.7,
  gapXMm: 3.2,
  gapYMm: 0
};

function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

export function getAvery5160Position(index: number): LabelPosition {
  const column = index % AVERY_5160.columns;
  const row = Math.floor(index / AVERY_5160.columns);

  return {
    x: roundToOneDecimal(
      AVERY_5160.marginLeftMm + column * (AVERY_5160.labelWidthMm + AVERY_5160.gapXMm)
    ),
    y: roundToOneDecimal(
      AVERY_5160.marginTopMm + row * (AVERY_5160.labelHeightMm + AVERY_5160.gapYMm)
    )
  };
}

export function getExportRowLimit(isUnlocked: boolean): number {
  return isUnlocked ? 1000 : 10;
}
