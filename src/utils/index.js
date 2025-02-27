const onChangeHandler = event => {
    event.preventDefault();
    const currentTarget = event && event.target;
    currentTarget &&
        currentTarget.name &&
        this.setState({ [currentTarget.name]: currentTarget.value });
};

const timeDifference = (current, previous) => {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < milliSecondsPerMinute / 3) {
        return 'just now';
    }

    if (elapsed < milliSecondsPerMinute) {
        return 'less than 1 min ago';
    } else if (elapsed < milliSecondsPerHour) {
        return Math.round(elapsed / milliSecondsPerMinute) + ' min ago';
    } else if (elapsed < milliSecondsPerDay) {
        return Math.round(elapsed / milliSecondsPerHour) + ' h ago';
    } else if (elapsed < milliSecondsPerMonth) {
        return Math.round(elapsed / milliSecondsPerDay) + ' days ago';
    } else if (elapsed < milliSecondsPerYear) {
        return Math.round(elapsed / milliSecondsPerMonth) + ' mo ago';
    } else {
        return Math.round(elapsed / milliSecondsPerYear) + ' years ago';
    }
};

const timeDifferenceForDate = date => {
    const now = new Date().getTime();
    const updated = new Date(date).getTime();
    return timeDifference(now, updated);
};

export { onChangeHandler, timeDifferenceForDate };
