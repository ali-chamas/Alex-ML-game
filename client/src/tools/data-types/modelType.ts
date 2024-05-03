export interface modelType {
  _id: string;
  dataset: datasetType;
  isTrained: boolean;
  modelUrl: string;
  createdAt: Date;
  trainedat: Date;
}

interface datasetType {
  labels: [labelType];
}

export interface labelType {
  _id: string;
  labelName: string;
  examples: [exampleType];
}

interface exampleType {
  _id: string;
  example: string;
}
