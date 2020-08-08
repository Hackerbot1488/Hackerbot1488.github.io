import { Select } from './Select/select'
// import './styles/style.scss' use if there are running parcel
const select = new Select('#select', {
  placeholder: 'Select an element',
  selectedId: '2',
  onSelect(item) {
    console.log(item)
  },
  data: [
    {
      id: '1', value: 'React'
    },
    {
      id: '2', value: 'Angular'
    },
    {
      id: '3', value: 'Vue'
    },
    {
      id: '4', value: 'Ember'
    }
  ]
})

window.s = select