import {query} from './utilities'
import './elements'
import './style.scss'

export interface Estado {
  id: number
  sigla: string
  nome: string
  regiao?: Estado
}

onload = () => {
  const framework = query('skill-icon#framework')

  framework?.addEventListener('change', ({detail, type}) => {
    console.log(detail)
    console.log(type)
  })

  const getEstados = async (orderBy = 'nome'): Promise<Estado[]> => {
    const url = `https://servicodados.ibge.gov.br/api/v1`
    const api = `/localidades/estados?orderBy=${orderBy}`
    return fetch(url + api).then((res) => res.json())
  }

  const autocomplete = query('autocomplete-list')

  if (autocomplete) {
    getEstados().then((res) =>
      res.forEach(({nome, sigla}) => autocomplete.addOption(nome, sigla))
    )
  }

  setTimeout(() => {
    framework?.setAttribute('icon', 'react')
    setTimeout(() => {
      framework?.setAttribute('icon', 'angular')
    }, 3000)
  }, 2000)
}
