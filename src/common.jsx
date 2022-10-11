export const Header = (props) => (
    <h1>{props.name}</h1>
)

export const Button = (props) => (
    <button onClick={props.onClick}>
        {props.text}
    </button>
)