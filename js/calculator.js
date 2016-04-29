'use strict'

function setupCalculator (el) {
  return new Calculator(el)
}

class Calculator {

  constructor (el) {
    const $inputs = Array.from(el.querySelectorAll('.input'))
    const $eval = el.querySelector('.eval')
    const $clear = el.querySelector('.clear')

    this.$display = el.querySelector('.display')

    this.value = ''

    $inputs.forEach(($input) => $input.addEventListener('click', this.inputToDisplay.bind(this)))
    $eval.addEventListener('click', this.eval.bind(this))
    $clear.addEventListener('click', this.clear.bind(this))
  }

  inputToDisplay (e) {
    // TODO if (this.dataset.singleInput)
    let value = e.currentTarget.textContent
    this.value += value
    this.displayValue(this.value)
  }

  displayValue (value) {
    this.$display.innerText = value
  }

  eval () {
    try {
      this.value = eval(sanitiseValue(this.value))
      this.displayValue(this.value)
    } catch (e) {
      this.displayValue(e.message)
    }
  }

  clear () {
    this.value = ''
    this.displayValue('')
  }
}

function sanitiseValue (value) {
  return value.replace(/÷/g, '/').replace(/x/g, '*')
}

