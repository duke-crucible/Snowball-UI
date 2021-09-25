function get_current_time() {
  var d = new Date();
  var date = d.getUTCDate();
  var month = d.getUTCMonth() + 1;
  var year = d.getUTCFullYear();

  var t = Date.now();

  return year + "_" + month + "_" + date + "_" + t;
}

export function save_report(csvStr, fileName, fileExtension) {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
  hiddenElement.target = "_blank";
  var timestamp = get_current_time();
  hiddenElement.download = fileName + "_" + timestamp + fileExtension;
  hiddenElement.click();
}
