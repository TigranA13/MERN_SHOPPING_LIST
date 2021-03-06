import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from 'prop-types';

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !!!nextProps.item.length
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className={'shopping-list'}>
            {
              items.length && items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames={'fade'}>
                  <ListGroupItem>
                    <Button
                      className={'remove-btn mr-3'}
                      color={'danger'}
                      size={'sm'}
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
          {
            !items.length && <TransitionGroup className={'shopping-list'}>
              <CSSTransition key={'notFound'} timeout={2000} classNames={'fade'}>
                <ListGroupItem style={{'textAlign': 'center'}}>No Item Added.</ListGroupItem>
              </CSSTransition>
            </TransitionGroup>
          }
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
