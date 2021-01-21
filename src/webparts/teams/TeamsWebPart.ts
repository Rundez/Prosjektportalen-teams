import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import * as strings from 'ProjectWebPartStrings';
import Teams from './components/Teams';
import { ITeamsProps } from './components/ITeamsProps';
import { WebPartContext } from "@microsoft/sp-webpart-base";    

import { sp } from "@pnp/sp";


export interface ITeamsWebPartProps {
  projectUrl: string;
  context: WebPartContext;
}

export default class TeamsWebPart extends BaseClientSideWebPart<ITeamsWebPartProps> {

  // Init of pnp/sp
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {

    ReactDom.render(React.createElement(Teams, this.properties), this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Property pane description.. placeholder"
          },
          groups: [
            {
              groupName: "Prosjektinnstillinger",
              groupFields: [
                PropertyPaneTextField('projectUrl', {
                  label: "ProsjektURL"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
