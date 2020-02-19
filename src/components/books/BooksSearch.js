import _ from "lodash";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Search, Grid, Icon } from "semantic-ui-react";
// import BooksList from ".BooksList";
import { Button, Table } from "reactstrap";
import Swal from "sweetalert2";
import { increaseQuantity } from "../cart/CartFunctions";

const initialState = { isLoading: false, results: [], value: "" };

class SearchBar extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {this.props.history.push({pathname: `/books/${result._id}`})
  this.setState({ isLoading: false, results: [], value: "" });}
    // this.setState({ value: result.name, results: [result] });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(`${result.name}  ${result.author}`);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.books, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Search
            input={{icon: value.length<=0?<Icon name='search'/>: <Icon className='search-icon' name='delete' link onClick={()=> this.setState({ isLoading: false, results: [], value: "" })}/>, iconPosition: 'left'}}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            resultRenderer={resultRenderer}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SearchBar);

const resultRenderer = ({ pic, price, name, author }) => [
  pic && name && (
    <div key="image" className="image" >
      <img src={pic} key="img" alt={name} />
    </div>
  ),
  <div key="content" className="content">
    {price && <div className="price">${price}</div>}
    {name && <div className="title">{name}</div>}
    {author && <div className="description">{author}</div>}
  </div>
];
