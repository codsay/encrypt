var app = new Vue({
  el: '#app',
  data: {
    input: '',
    output: '',
    histories: []
  },

  methods: {
  	encrypt: function() {
  		this.histories.push({
  			input: this.input,
  			output: this.output
  		})
  		this.$http.post('/encrypt/0', {
  			data: this.input
  		}).then(function (response) {
  			this.output = response.body.value;
  		});
  	},
  	decrypt: function() {
  		this.histories.push({
  			input: this.input,
  			output: this.output
  		})
  		this.$http.post('/encrypt/1', {
  			data: this.output
  		}).then(function (response) {
  			this.input = response.body.value;
  		})
  	}
  }
})