export const Header = (props) => (
    <h1>{props.name}</h1>
)

export const Button = (props) => {
    const buttonType = props.type ? props.type : 'button';
    if (buttonType === 'submit') {
        return (
            <button type={buttonType}>
                {props.text}
            </button>
        );
    }

    return (
        <button type={buttonType} onClick={props.onClick}>
            {props.text}
        </button>
    );
}