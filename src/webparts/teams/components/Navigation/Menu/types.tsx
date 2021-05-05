export interface IMenuProps {
  /**
   * Relative path to the link component  
   */
  path: string;
  /**
   * Active function that changes states
   */
  active: any;
  /**
   * The state the parent component has at the moment
   */
  activeState: string;
  /** 
   * Optinal the name of the Menu, is required if not a picture
   * */ 
  name?: string;
  /**
   * Optinal the image url of the Menu component, is required if not a name
   */
  image?: string;
}
