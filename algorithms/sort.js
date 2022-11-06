
const sort = (orderBy) => {
    const params = orderBy.split(',');

    const obj = {};

    params.forEach(param => {
        obj[param] = -1;
    });

    return obj;
}



module.exports = { sort }