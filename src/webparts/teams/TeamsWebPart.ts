import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, IMicrosoftTeams } from '@microsoft/sp-webpart-base';
import {Teams} from './components/Teams';
import { ITeamsProps } from './components/ITeamsProps';
import { WebPartContext } from "@microsoft/sp-webpart-base";    
import { sp } from "@pnp/sp";
import { graph } from "@pnp/graph";
import "@pnp/graph/groups";

export interface ITeamsWebPartProps {
  projectUrl: string;
  riskMatrixHeight: number;
  riskMatrixWidth: number;
  riskMatrixListName: string;
  context?: WebPartContext
}

export default class TeamsWebPart extends BaseClientSideWebPart<ITeamsWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // Put the teams context and SP context in to the properties. 
      
      // Init of the graph
      graph.setup({
        spfxContext: this.context
      });  
      
      // Init of pnp/js library.
      sp.setup({
        spfxContext: this.context
      });

    });

  }

  public render(): void {

    const element: React.ReactElement<ITeamsWebPartProps> = React.createElement(
      Teams, 
      {
        projectUrl: this.properties.projectUrl,
        riskMatrixHeight: this.properties.riskMatrixHeight,
        riskMatrixWidth: this.properties.riskMatrixWidth,
        riskMatrixListName: this.properties.riskMatrixListName,
        context: this.context
      }
    );
    ReactDom.render(element, this.domElement);

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
                PropertyPaneTextField('riskMatrixListName', {
                  label: "Listenavn",
                  value: "usikkerhet",
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
