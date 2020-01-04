const onChangeHandler = event => {
    event.preventDefault();
    const currentTarget = event && event.target;
    currentTarget &&
        currentTarget.name &&
        this.setState({ [currentTarget.name]: currentTarget.value });
};

export default onChangeHandler;
