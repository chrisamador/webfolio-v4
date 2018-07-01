// @flow
import React, { PureComponent } from "react";
import Col from '../../../common/layout/Col';
import Row from '../../../common/layout/Row';
import ReactMarkdown from "react-markdown";
import Color from "color";
import MockScreen from '../../../common/MockScreen';

const ContentBackground = ({intro, callouts}) => {
  return (
    <div className="container">
      <Row className="u-mb-l">
        <Col className="col-xs-12 col-sm-6 col-sm-offset-3">
          {intro}
        </Col>
      </Row>
      <Row>
        {
          callouts.map((item, index) => (
            <Col className="col-xs-6 col-sm-4 text-sm-center" key={index}>
              <ReactMarkdown source={item} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
const ContentStyleGuide = ({contents}) => {
  return (
    <div className="container">
      <Row>
        <Col className="col-xs-12 col-sm-10 col-sm-offset-1">
          {Object.keys(contents).map((key)=>{
            let c;
            switch (key) {
              case "typefaces":
                c = (<img className="style-guide__typefaces" src={contents[key]} alt={key}/>);
                break;
              case "brand_elements":
                c = (<ContentBrandElements brandElements={contents[key]} />);
                break;
              default:
                // c = contents[key];
            }
            return (
              <div className="style-guide" key={key}>
                <div className="style-guide__header">
                  <h5>{key.replace("_", " ")}</h5>
                </div>
                <div className="style-guide__content">
                  {c}
                </div>
              </div>)
          })}
        </Col>
      </Row>
    </div>
  )
}

const ContentBrandElements = ({brandElements}) => {
  return (Object.keys(brandElements).map((key, index) => {
    let c;
    switch (key) {
      case "colors":
        c = (<ContentBrandElementsColors colors={brandElements[key]} />)
        break;
      case "img":
        c = (<img className="style-guide__brand-elm-img" src={brandElements[key]} alt={key}/>)
        break;
      default:
        c = brandElements[key]
    }
    return (<div key={index}>{c}</div>);
  }));
}

const ContentBrandElementsColors = ({colors}) => {
  // Array of colors
  return (
    colors.map((color, index) => (
      <div className="brand-elm-color" key={index}>
        <div className="brand-elm-color__container">
          <div className="brand-elm-color__plus" style={{backgroundColor: Color(color).lighten(.3).hsl().string()}}></div>
          <div className="brand-elm-color__main" style={{backgroundColor: color}}></div>
          <div className="brand-elm-color__minus" style={{backgroundColor: Color(color).darken(.3).hsl().string()}}></div>
        </div>
        <h6>{color}</h6>
      </div>
    ))
  )
}

type DesignsStandard = {
  src: string,
  caption: string
}

type DesignCol = {
  col: Array<DesignsStandard>
}

const ContentDesigns = ({designs, primaryColor}: {designs: Array<DesignsStandard | DesignCol>, primaryColor: string}) => {
  return (
    <div className="work-single__section-content-designs" style={{backgroundColor: primaryColor}}>
      <div className="container">
        {
          designs.map((design, index) => {
            if(design.cols){
              return (
                <Row key={index}>
                  <Col className="col-xs-12 col-sm-6">
                    {
                      design.cols.map((col, index) => {
                        if(index % 2 !== 0) return null;
                        return (
                          <div className="section-content-designs"  key={index}>
                            <MockScreen imageSrc={col.src} />
                            {col.caption && <ReactMarkdown className="section-content-designs__caption" source={col.caption}/>}
                          </div>
                        );
                      })
                    }
                  </Col>
                  <Col className="col-xs-12 col-sm-6">
                    {
                      design.cols.map((col, index) => {
                        if(index % 2 === 0) return null;
                        return (
                          <div className="section-content-designs"  key={index}>
                            <MockScreen imageSrc={col.src} />
                            {col.caption && <ReactMarkdown className="section-content-designs__caption" source={col.caption}/>}
                          </div>
                        );
                      })
                    }
                  </Col>
                </Row>
              )
            }else{
              return (
                <div className="section-content-designs" key={index}>
                  <MockScreen imageSrc={design.src} />
                  {design.caption && <ReactMarkdown className="section-content-designs__caption is-single" source={design.caption}/>}
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

type PropType = {
  index: number,
  title: string,
  primaryColor: string,
  content: {}
};
type StateType = {};

class WorkSingleSection extends PureComponent<PropType, StateType> {
  state = {};
  render(){
    // Content format
    let sectionContent;
    this.props;
    switch (this.props.title) {
      case "background":
        sectionContent = (<ContentBackground {...this.props.content}/>);
        break;
      case "style_guide":
        sectionContent = (<ContentStyleGuide contents={this.props.content} />);
        break;
      case "webpage_designs":
        sectionContent = (<ContentDesigns designs={this.props.content} primaryColor={this.props.primaryColor}/>);
        break;
      default:
        sectionContent = (<ReactMarkdown source={this.props.content} />);
    }

    return (
      <section className="work-single__section">
        <div className="work-single__section-title-area">
          <div className="work-single__section-number">{this.props.index}</div>
          <h5 className="work-single__section-title">{this.props.title.replace("_", " ")}</h5>
        </div>
        <div className="work-single__section-content">
          {sectionContent}
        </div>
      </section>
    );
  }
}

export default WorkSingleSection;
