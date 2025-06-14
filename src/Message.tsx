function Message() {
    const message = 'Special message';
    if (message) {
        return <h1>Hello from Message component and text: {message}</h1>;
    }
    return <h1>No message</h1>;

}

export default Message;