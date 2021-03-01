import * as React from "react";
import * as ReactDOM from "react-dom";

import { override } from "@microsoft/decorators";
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from "@microsoft/sp-listview-extensibility";

import { IContext } from "@pnp/spfx-controls-react/lib/common/Interfaces";
import { Log } from "@microsoft/sp-core-library";
import { FieldRendererHelper as FieldRenderer } from "@pnp/spfx-controls-react/lib/Utilities";

import { ListItemAccessor } from "@microsoft/sp-listview-extensibility";

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFieldRendererHelperFieldCustomizerProperties {}

const LOG_SOURCE: string = "FieldRendererHelperFieldCustomizer";

export default class FieldRendererHelperFieldCustomizer extends BaseFieldCustomizer<IFieldRendererHelperFieldCustomizerProperties> {
  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(
      LOG_SOURCE,
      "Activated FieldRendererHelperFieldCustomizer with properties:"
    );
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(
      LOG_SOURCE,
      `The following string should be equal: "FieldRendererHelperFieldCustomizer" and "${"strings.Title"}"`
    );
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const fieldRendererHelper: React.ReactElement<{}> = React.createElement(
      FieldRendererHelper,
      {
        context: this.context as IContext,
        fieldValue: event.fieldValue,
        listItemAccessor: event.listItem,
        cssProps: {
          backgroundColor: "#C3C3C3",
          color: "#000",
        },
      } as IFieldRendererHelperProps
    );

    ReactDOM.render(fieldRendererHelper, event.domElement);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}

export interface IFieldRendererHelperProps {
  /**
   * value of the field as it appears in the customizers
   */
  fieldValue: any;
  /**
   * class to appy to the cell content
   */
  className?: string;
  /**
   * CSS to apply to the cell content
   */
  cssProps?: React.CSSProperties;
  /**
   * current list item
   */
  listItemAccessor: ListItemAccessor;
  /**
   * field customizer context
   */
  context: IContext;
}

export interface IFieldRendererHelperState {
  fieldRenderer?: FieldRenderer;
}

export class FieldRendererHelper extends React.Component<
  IFieldRendererHelperProps,
  IFieldRendererHelperState
> {
  constructor(props: IFieldRendererHelperProps) {
    super(props);

    this.state = {};
  }

  @override
  public async componentDidMount(): Promise<void> {
    const {
      fieldValue,
      className,
      cssProps,
      listItemAccessor,
      context,
    } = this.props;
    // asynchronously getting field renderer. FieldRendererHelper will automatically select needed renderer based on field type
    const renderer = await FieldRenderer.getFieldRenderer(
      fieldValue,
      {
        className: className,
        cssProps: cssProps,
      },
      listItemAccessor,
      context
    );

    this.setState({
      fieldRenderer: renderer,
    });
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, "React Element: FieldRendererHelper unmounted");
  }

  @override
  public render(): React.ReactElement<{}> {
    const { fieldRenderer } = this.state;

    return <div>{fieldRenderer || null}</div>;
  }
}
