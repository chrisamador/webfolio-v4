// @flow


let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const dateFormater = (date: string) => {
  // Add 5 hours to match the correct timezone
  // TODO: fix the timezone issue from YAML http://yaml.org/type/timestamp.html
  let d = new Date(new Date(date).getTime() + 18000000);
  return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
};


export default dateFormater;
