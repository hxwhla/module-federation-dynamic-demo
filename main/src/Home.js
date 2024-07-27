export default (num) => {
  let str = '<ul>';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < num; i++) {
    str += `<li>item ${i}</li>`;
  }
  str += '</ul>';
  return str;
};
