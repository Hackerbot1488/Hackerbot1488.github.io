const getTemplate = (placeholder = 'Select an element', data = [], selectedId = null) => {
  let addClass = ''
  let text = null
  const items = data.map(item => {
    if (selectedId !== null && selectedId === item.id) {
      addClass = 'select__item_selected'
      text = item.value
    }
    return `<li class="select__item ${selectedId === item.id ? addClass : ''}"  data-type="item" data-id="${item.id}">${item.value}</li>`
  })
  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${addClass ? text : placeholder}</span>
      <i class="fas fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown" data-type="dropdown">
      <ul class="select__list">
        ${items.join('\n')}
      </ul>
    </div>
        `
}
export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId || null
    this.#render()
    this.#setup()
  }
  #render() {
    const { placeholder, data } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(placeholder, data, this.selectedId)
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }
  clickHandler(event) {
    const { type } = event.target.dataset
    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
      this.toggle()
    } else if (type === "backdrop") {
      this.toggle()
    }
  }
  get isOpen() {
    return this.$el.classList.contains('select_open')
  }
  get current() {
    return this.options.data.find(el => el.id === this.selectedId)
  }
  select(id) {
    if (this.selectedId !== null) {
      this.toggleSelected(this.selectedId)
    }
    this.selectedId = id
    this.$value.textContent = this.current.value
    this.options.onSelect ? this.options.onSelect(this.current) : null
    this.toggleSelected(this.selectedId)
  }
  toggleSelected(id) {
    this.$el.querySelector(`[data-id="${id}"]`).classList.toggle('select__item_selected')
  }
  toggle() {
    this.isOpen ? this.close() : this.open()
  }
  open() {
    this.$el.classList.add('select_open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }
  close() {
    this.$el.classList.remove('select_open')
    this.$arrow.classList.remove('fa-chevron-up')
    this.$arrow.classList.add('fa-chevron-down')
  }
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}
