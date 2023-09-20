const reverse_obj = (role, value) => {
    const obj = {};
    for (const key in value) {
        if (typeof value[key] === 'string') {
            obj[`${role}_${key}`] = value[key].trim();
        } else {
            obj[`${role}_${key}`] = value[key];
        }
    }
    return obj;
}

module.exports = reverse_obj;
