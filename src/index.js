import React from 'react'
import Select from 'react-select-plus'
import Fuse from 'fuse.js'
import _ from 'lodash'

let keysArray = []

class ReactFuseFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredData: [],
      filters: [],
      options: [],
      data: [

        {
          title: 'Old Man\'s War',
          author: {
            firstName: 'John',
            lastName: 'Scalzi',
          },
        },
        {
          title: 'The Lock Artist',
          author: {
            firstName: 'Steve',
            lastName: 'Hamilton',
          },
        },
        {
          title: 'HTML5',
          author: {
            firstName: 'Remy',
            lastName: 'Sharp',
          },
        },
        {
          title: 'Right Ho Jeeves',
          author: {
            firstName: 'P.D',
            lastName: 'Woodhouse',
          },
        },
        {
          title: 'The Code of the Wooster',
          author: {
            firstName: 'P.D',
            lastName: 'Woodhouse',
          },
        },
        {
          title: 'Thank You Jeeves',
          author: {
            firstName: 'P.D',
            lastName: 'Woodhouse',
          },
        },
        {
          title: 'The DaVinci Code',
          author: {
            firstName: 'Dan',
            lastName: 'Brown',
          },
        },
        {
          title: 'Angels & Demons',
          author: {
            firstName: 'Dan',
            lastName: 'Brown',
          },
        },
        {
          title: 'The Silmarillion',
          author: {
            firstName: 'J.R.R',
            lastName: 'Tolkien',
          },
        },
        {
          title: 'Syrup',
          author: {
            firstName: 'Max',
            lastName: 'Barry',
          },
        },
        {
          title: 'The Lost Symbol',
          author: {
            firstName: 'Dan',
            lastName: 'Brown',
          },
        },
        {
          title: 'The Book of Lies',
          author: {
            firstName: 'Brad',
            lastName: 'Meltzer',
          },
        },
        {
          title: 'Lamb',
          author: {
            firstName: 'Christopher',
            lastName: 'Moore',
          },
        },
        {
          title: 'Fool',
          author: {
            firstName: 'Christopher',
            lastName: 'Moore',
          },
        },
        {
          title: 'Incompetence',
          author: {
            firstName: 'Rob',
            lastName: 'Grant',
          },
        },
        {
          title: 'Fat',
          author: {
            firstName: 'Rob',
            lastName: 'Grant',
          },
        },
        {
          title: 'Colony',
          author: {
            firstName: 'Rob',
            lastName: 'Grant',
          },
        },
        {
          title: 'Backwards, Red Dwarf',
          author: {
            firstName: 'Rob',
            lastName: 'Grant',
          },
        },
        {
          title: 'The Grand Design',
          author: {
            firstName: 'Stephen',
            lastName: 'Hawking',
          },
        },
        {
          title: 'The Book of Samson',
          author: {
            firstName: 'David',
            lastName: 'Maine',
          },
        },
        {
          title: 'The Preservationist',
          author: {
            firstName: 'David',
            lastName: 'Maine',
          },
        },
        {
          title: 'Fallen',
          author: {
            firstName: 'David',
            lastName: 'Maine',
          },
        },
        {
          title: 'Monster 1959',
          author: {
            firstName: 'David',
            lastName: 'Maine',
          },
          test:[{
            Kemo:"dhgvgfhsdf",
            iner:[{inner:[{innerr:"fgdvsfhsdvfsdf"},{innerr1:"fgdvsfhsdvfsdf"},{innerr2:"fgdvsfhsdvfsdf"}]}]
          }]
        },
      ],

    }
  }

  getKeys=(obj, val)=>{
    let objects = []
    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) continue
      if ((typeof obj[i] == 'object' && !(Array.isArray(obj[i]))) ||Array.isArray(obj[i]) && typeof obj[i][0] === 'object' ){
        objects = objects.concat(this.getKeys(obj[i], val))
      }
      else  {
        if ( String(obj[i]).match(new RegExp(String(val), 'gi')) !== null){
          objects.push(i)
        }else{
          if( Array.isArray(obj[i]) && typeof obj[i][0] !== 'object' && obj[i].includes(val) ){
            objects.push(i)
          }
        }
      }
    }
    return objects
  }

  onInputChange = (inputVal) => {
    if (inputVal && inputVal.trim() !== '') {
      const uniqueOptions = _.uniq(this.getKeys(this.state.data, inputVal)).sort()
      const updateOptions = uniqueOptions.map((uo) => {
        return { value: uo, label: uo + ':' + inputVal }
      })
      updateOptions.unshift({ value: inputVal, label: inputVal })
      this.setState({ options: updateOptions })
    } else {
      this.setState({ options: [] })
    }
  }

  onChangeData = (e, value) => {
    this.setState({ data: value })
  }

  setSelectedFilter = (filters) => {
    this.setState({ filters: filters })
    if (filters.length > 0) {
      this.getFilteredData(filters[filters.length - 1])
      this.setState({ options: [] })
    } else {
      this.setState({ filteredData: [] })
    }

  }

  iterate = (obj, stack) => {
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        const x = stack !== '' ? `${stack}.${property}` : property
        if (typeof obj[property] === 'object') {
          this.iterate(obj[property], x)
        } else {

          const key = stack !== '' ?`${stack}.${property}`: property
          keysArray.push(key.replace(/\.\d+/g,""))
        }
      }
    }

    return keysArray
  }

  getFilteredData(filter) {
    const data = this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data
    const allKeys = _.uniq(_.flatMap(data, (x) => this.iterate(x, '')))
    const keys = filter.value === filter.label ? allKeys : _.filter(allKeys, (k) => k.includes(filter.value))
    const value = filter.value === filter.label ? filter.value : filter.label.split(':')[1]
    const fuse = new Fuse(data, { keys: [...keys], threshold: 0.2 })
    console.log(allKeys, fuse.search(value))
    this.setState({ filteredData: fuse.search(value) })

  }

  render() {
    return (
      <div className="row">
        <div>
          <h4>Input Data</h4>
          <textarea id="itemsTextArea"
                    cols={100}
                    rows={20}
                    value={JSON.stringify(this.state.data, undefined, 4)}
                    onChange={this.onChangeData}>
         </textarea>
        </div>
        <br />
        <Select
          multi
          options={this.state.options}
          noResultsText="Begin typing to search"
          name="form-field-name"
          onInputChange={this.onInputChange}
          onChange={this.setSelectedFilter}
          value={this.state.filters}
        />
        <br />
        <h4>Filtered Data</h4>
        <textarea id="itemsFilteredTextArea"
                  disabled
                  cols={100}
                  rows={20}
                  value={JSON.stringify(this.state.filteredData, undefined, 4)}
        ></textarea>

      </div>


    )
  }
}

export default  ReactFuseFilter
