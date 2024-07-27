var express = require('express');
var router = express.Router();
const fs = require('fs-extra');

/* GET users listing. */
router.get('/*', function(req, res, next) {
  const cmp = req.params[0]
  console.log(cmp)
  let code = null;
  
  if (['remoteApp1.js', 'src_Header_js.js'].includes(cmp)) {
    code = fs.readFileSync(`cmp/remoteApp1/${cmp}`, 'utf8')
  }
  else if (['remoteApp2.js', 'src_Footer_js.js'].includes(cmp)) {
    code = fs.readFileSync(`cmp/remoteApp2/${cmp}`, 'utf8')
  }
  res.send(code);
});

module.exports = router;
