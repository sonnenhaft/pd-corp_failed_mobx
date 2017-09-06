// ie10-11 polyfill
if ( !FileReader.prototype.readAsBinaryString ) {
  FileReader.prototype.readAsBinaryString = function(blob) {
    const reader = new FileReader()
    reader.onload = () => {
      let result = ''
      const bytes = new Uint8Array(reader.result)
      const stringLen = bytes.byteLength
      for (let charIdx = 0; charIdx < stringLen; charIdx++) {
        result += String.fromCharCode(bytes[charIdx])
      }
      this.onload({ target: { result } })
    }
    reader.readAsArrayBuffer(blob)
  }
}
