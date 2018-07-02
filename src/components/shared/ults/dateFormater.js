// @flow


let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const dateFormater = (date: number) => {
  let d = new Date(Number(date));
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
};


export default dateFormater;
