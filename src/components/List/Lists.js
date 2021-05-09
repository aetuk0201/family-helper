import List from "../List";


function Lists(props) {
    return (
        <div>
             {props.listItems.map((item) => (
               <List key={item.id} {...item} />)
          )}
        </div>
    );
}

export default Lists;