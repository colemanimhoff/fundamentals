import React, { Component } from 'react'

export default class SearchBar extends Component {
  state = { term: '' }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.term)
    this.setState({ term: '' })
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Image Search</label>
            <input
              onChange={(e) => this.setState({ term: e.target.value })}
              value={this.state.term}
              type="text"
            />
          </div>
        </form>
      </div>
    )
  }
}
