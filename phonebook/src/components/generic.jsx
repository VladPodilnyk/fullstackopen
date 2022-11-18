export const Header = ({ name }) => (
    <h1>{name}</h1>
)

export const Button = ({ type, text, onClick }) => {
    const buttonType = type ? type : 'button';
    if (buttonType === 'submit') {
        return (
            <button type={buttonType}>
                {text}
            </button>
        );
    }

    return (
        <button type={buttonType} onClick={onClick}>
            {text}
        </button>
    );
}

export const Notification = ({ value }) => {
    if (value.message === '') {
      return null
    }
  
    return (
      <div className={value.type}>
        {value.message}
      </div>
    );
}