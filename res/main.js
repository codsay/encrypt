const SECURITY = {
  TYPE: {
    ENCRYPT: 1,
    DECRYPT: 2
  },
  AES: {
    parse: function(key, data, type) {
      var value;
      try {
        value = CryptoJS.AES[type == SECURITY.TYPE.ENCRYPT ? "encrypt" : "decrypt"](data, key);
        if (type == SECURITY.TYPE.ENCRYPT) {
          value = value.toString();
        } else {
          value = value.toString(CryptoJS.enc.Utf8);
        }
      } catch (e) {
        value = "";
      }
      return value;
    }
  }
}

var app = new Vue({
  el: '#app',
  data: {
    input: '',
    output: '',
    key: '',
    histories: []
  },

  methods: {
    encryptKey: function() {
      if (this.key && !this.key.startsWith("MD5_")) {
        this.key = "MD5_" + CryptoJS.SHA256(this.key).toString();
      }
    },
    encrypt: function() {
      if (this.input) {
        this.histories.push({
          input: this.input,
          output: this.output
        });
        this.output = SECURITY.AES.parse(this.key, this.input, SECURITY.TYPE.ENCRYPT);
      }
    },
    decrypt: function() {
      if (this.output) {
        this.histories.push({
          input: this.input,
          output: this.output
        })
        this.input = SECURITY.AES.parse(this.key, this.output, SECURITY.TYPE.DECRYPT);
      }
    }
  }
})
