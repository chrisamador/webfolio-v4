// DELETE ME

// // @flow
// // import type {DesNotesType} from '../../../types/siteTypes';
//
// import React, { PureComponent } from 'react';
// import Icon from '../shared/Icon';
// import Col from '../shared/layout/Col';
// import Row from '../shared/layout/Row';
//
// import Link from 'gatsby-link';
//
// import DesNotesPreview from '../lognotes/previews/DesnotePreview';
// import DesNotesPreviewMini from '../lognotes/previews/DesnotePreviewMini';
//
// import type {QueryContentLogsNotesType} from '../../pages/index';
//
// type PropType = {
//   // desnotes: Array<DesNotesType>
//   desnotes: QueryContentLogsNotesType
// };
// type StateType = {};
//
// class HomeDesNotes extends PureComponent<PropType, StateType> {
//   state = {};
//   render(){
//     let desnotes = [...this.props.desnotes.edges];
//
//     return (
//       <section className="home-des-notes">
//         <div className="container">
//           <Row>
//             <Col className="col-xs-12 col-sm-12 col-md-4">
//               <h5 className="text-subtitle">Latest</h5>
//               <h4 className="text-section-title">Notes</h4>
//               <div className="text-intro">
//                 <p>Notes (Design Notes) are my thoughts on all things related to the design process. Occasionally I share things about trends, tools, design patterns, and anything interesting enough to share.</p>
//               </div>
//               <Link style={{marginBottom: 40}} to="/logs-notes?view=notes" className="btn btn-ghost">View All</Link>
//             </Col>
//             <Col className="col-xs-12 col-sm-6 col-md-4">
//               <DesNotesPreview desnote={desnotes.shift()} />
//             </Col>
//             <Col className="col-xs-12 col-sm-6 col-md-4">
//               <DesNotesPreview desnote={desnotes.shift()} />
//             </Col>
//           </Row>
//           <Row>
//             {
//               desnotes.map((desnote, index) => (
//                 <Col className="col-xs-12 col-sm-6 col-md-3" key={index}>
//                   <DesNotesPreviewMini desnote={desnote} />
//                 </Col>
//               ))
//             }
//             <Col className={desnotes.length ? "col-xs-12 col-sm-6 col-md-3" : "col-xs-12 col-sm-8 col-sm-offset-2"}>
//               <Link to="/logs-notes?view=notes" className="devdes-more">
//                 <div className="devdes-more__text">
//                   <h5 className="text-subtitle">View All</h5>
//                   <Icon id="icon-right-arrow" className="icon-more-arrow"/>
//                 </div>
//               </Link>
//             </Col>
//           </Row>
//         </div>
//       </section>
//     );
//   }
// }
//
// export default HomeDesNotes;
