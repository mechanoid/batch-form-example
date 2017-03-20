/* global customElements, $, HTMLElement, alert */

class Row {
  constructor (row) {
    this.dom = {}

    this.dom.self = $(row)
    this.dom.button = $('button', this.dom.self)

    this.action = this.dom.self.data('action')
    this.method = this.dom.self.data('method')
    this.dom.button.on('click', (e) => {
      e.preventDefault()
      this.serialize()
    })
  }

  serialize () {
    $.ajax(this.action, {
      method: this.method || 'GET',
      data: $('input', this.dom.self).serialize()
    })
    .done(function (data) {
      window.location = window.location.href
    })
  }
}

class BatchTable extends HTMLElement {
  constructor () {
    super()
    this.dom = {}
  }

  connectedCallback () {
    this.dom.table = $('table', this)
    this.dom.rows = $('tbody tr', this.dom.table)
    this.dom.table.addClass('active')

    this.rows = [...this.dom.rows].map(r => new Row(r))
  }
}

if (window.customElements && window.customElements.define) {
  window.customElements.define('batch-table', BatchTable)
}
