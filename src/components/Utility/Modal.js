
import React, { useReducer } from "react";
import { API, graphqlOperation  } from "aws-amplify";
import './Modal.css';
import { createItem } from "../../graphql/mutations";

const intialState = {
    title: '',
    quantity: 0
};

function listReducer(state = intialState, action){
    switch(action.type){
        case 'TITLE_CHANGED':
            console.log(action.value);
            return {...state, title: action.value }
        case 'QUANTITY_CHANGED':
            console.log(action.value);
            return {...state, quantity: action.value}
        default:
            console.log('Default action for: ', action)
            return state
    }
}



function Modal(props) {
  const { show, closeModal } = props;

  const [state, dispatch] = useReducer(listReducer, intialState);

  async function Saveitem(){
    const {title, quantity} = state;
    const result = await API.graphql(graphqlOperation(createItem, {input: {title, quantity}}));

    console.log('saved data with result: ', result);
}

  return (
    <>
      <div className={show ? "modal" : "hide"}>
        <button onClick={closeModal}>X</button>
        <h1>Modal heading</h1>
        <p>This is modal content</p>
        <form>
            <div>
                <label>Title</label>
                <input 
                    type="text" 
                    placeholder='title'
                    onChange={(e) => dispatch({ type: 'TITLE_CHANGED', value: e.target.value })}
                    />
            </div>
            <div>
                <label>Quantity</label>
                <input 
                    type="text" 
                    placeholder='quantity'
                    onChange={(e) => dispatch({ type: 'QUANTITY_CHANGED', value: e.target.value })}
                    />
            </div>
            <hr/>
            <div>
                <input type="button" onClick={Saveitem} value="save" />
            </div>
        </form>
      </div>
    </>
  );
}

export default Modal;