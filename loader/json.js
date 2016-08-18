module.exports = function(source) {
  this.cacheable && this.cacheable();
  var value = typeof source === "string" ? JSON.parse(source) : source;
  this.value = [value];
  return "module.exports = " + JSON.stringify(value) + ";";
}
