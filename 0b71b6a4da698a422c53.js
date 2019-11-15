webpackJsonp([1],{

/***/ 1073:
/***/ (function(module, exports) {

// ie10-11 polyfill
if (!FileReader.prototype.readAsBinaryString) {
  FileReader.prototype.readAsBinaryString = function (blob) {
    var _this = this;

    var reader = new FileReader();
    reader.onload = function () {
      var result = '';
      var bytes = new Uint8Array(reader.result);
      var stringLen = bytes.byteLength;
      for (var charIdx = 0; charIdx < stringLen; charIdx++) {
        result += String.fromCharCode(bytes[charIdx]);
      }
      _this.onload({ target: { result: result } });
    };
    reader.readAsArrayBuffer(blob);
  };
}

/***/ })

});
//# sourceMappingURL=0b71b6a4da698a422c53.js.map