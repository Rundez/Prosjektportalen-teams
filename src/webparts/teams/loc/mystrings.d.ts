declare interface ITeamsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'TeamsWebPartStrings' {
  const strings: ITeamsWebPartStrings;
  export = strings;
}
