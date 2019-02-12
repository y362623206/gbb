//获取任意天日期
var setinput=function(n) {
  var today = new Date();
  today.setDate(today.getDate() + n);
  var y = today.getFullYear();
  var m = today.getMonth() + 1;//获取当前月份的日期
  if (m < 10) {
    m = '0' + m;
  }
  var d = today.getDate();
  if (d < 10) {
    d = '0' + d;
  }
  return y + "-" + m + "-" + d;
}

module.exports = {
  setinput: setinput,
};