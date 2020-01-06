const findById = (apps, code) => {
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        if (app.name === code) {
            return app;
        }
    }
    return null;
};

export default findById;