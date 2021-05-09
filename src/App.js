import './App.css';
import { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation  } from "aws-amplify";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator, AmplifySignOut  } from "@aws-amplify/ui-react";
import { listItems } from "./graphql/queries";
import { onCreateItem } from "./graphql/subscriptions";
import Lists from './components/List/Lists';
import Modal from "./components/Utility/Modal";

Amplify.configure(awsConfig);

function App() {

  const [itemsList, setListItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const fetchList = async() => {
    const {data} = await API.graphql(graphqlOperation(listItems));
    setListItems(data.listItems.items)
    console.log(data);
  }

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if(newItem !== ''){
      setListItems([newItem, ...itemsList]);
    }
  }, [newItem]);

  const addItemToList = ({ data }) => {
    setNewItem(data.onCreateItem);
  }

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateItem)).subscribe({next: ({provider, value}) => addItemToList(value) });
  }, [])

  return (
    <AmplifyAuthenticator>
      <div className="App">
        <AmplifySignOut/>
        <h1>Welcom to Amplify</h1>
          <Lists listItems={itemsList} />
          {!show && <button onClick={openModal}>Show modal</button>}
        <Modal closeModal={closeModal} show={show} />
      </div>
    </AmplifyAuthenticator>
    
  );
}

export default App;
