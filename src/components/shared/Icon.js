// @flow
import React from "react";

const Icon = (props: {
  id: string,
  fill?: string,
  small?: boolean,
  medium?: boolean,
  textColor?: boolean,
  className?: string,
  style?: any
}): React$Element<*> => {
  let {id, fill, className, style} = props;
  let classNames = "icon" + (className ? " " + className : "");
  style = Object.assign({}, {fill}, style);
  if(props.small) classNames += " icon-small";
  if(props.medium) classNames += " icon-small";
  if(props.textColor) classNames += " icon-text-color";

  return (<svg xmlnsXlink="http://www.w3.org/1999/xlink" className={classNames} style={style} ><use xlinkHref={"#"+id} /></svg>);
};

export default Icon;
