import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
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
  riskMatrixHeight: number;
  riskMatrixWidth: number;
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
    console.log(this.context.sdks.microsoftTeams);

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
            description: "Settings for all components"
          },
          groups: [
            {
              groupName: "Risikomatrise",
              groupFields: [
                PropertyPaneSlider('riskMatrixHeight', {
                  label: "Høyde",
                  min: 100,
                  max: 1000,
                  value: 500,
                  showValue: true,
                  step: 1,
                }),
                PropertyPaneSlider('riskMatrixWidth', {
                  label: "Bredde",
                  min: 100,
                  max: 1000,
                  value: 500,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneDropdown('riskMatrixWidth', {
                  label: "Prosjekt",
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
