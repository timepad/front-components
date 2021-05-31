let lastId = 0;

const uniqueId = (prefix = 'id'): string => {
    lastId++;
    return `${prefix}${lastId}`;
};

export {uniqueId};
