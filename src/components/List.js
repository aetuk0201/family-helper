import { attachEventProps } from "@aws-amplify/ui-react/lib-esm/react-component-lib/utils";

function List(props) {
    return(
        <div key={props.id}>
            <div>{props.title}</div>
            <div>{ new Date(props.createdAt).toDateString() }</div>
        </div>
    )
}

export default List;