import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import {PropertyFieldEnterpriseTermPicker, IPickerTerms} from '@pnp/spfx-property-controls'
import { BaseClientSideWebPart, IMicrosoftTeams } from '@microsoft/sp-webpart-base';
import {Teams} from './components/Teams';
import { ITeamsProps } from './components/ITeamsProps';
import { WebPartContext } from "@microsoft/sp-webpart-base";    
import { sp } from "@pnp/sp";
import { graph } from "@pnp/graph";

export interface ITeamsWebPartProps {
  projectUrl: string;
  riskMatrixHeight: number;
  riskMatrixWidth: number;
  riskMatrixListName: string;
  terms: IPickerTerms ; 
  context?: WebPartContext;
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
        terms: this.properties.terms,
        context: this.context,
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
            },
            {
              groupName:"Navigasjon",
              groupFields:[
                PropertyFieldEnterpriseTermPicker('terms', {
                  label: 'Select terms',
                  panelTitle: 'Select terms',
                  initialValues: this.properties.terms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: true,
                  limitByTermsetNameOrID: 'Navigasjon',
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  includeLabels: true,
                  key: '1a58ab36-36bb-4234-abad-ad2410b0b74f'
                })
                
                   
              ]
            }
          ],
        }
        
      ]
    };
  }
}
