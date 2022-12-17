import {query} from './utilities'
import './elements'
import './style.scss'

onload = () => {
  const framework = query('skill-icon#framework')

  framework?.addEventListener('change', ({detail, type}) => {
    console.log(detail)
    console.log(type)
  })

  setTimeout(() => {
    framework?.setAttribute('icon', 'react')
    setTimeout(() => {
      framework?.setAttribute('icon', 'angular')
    }, 3000)
  }, 2000)
}
