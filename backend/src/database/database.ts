import { connect } from 'mongoose';

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;

const connectionUri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`;
console.log(connectionUri);


const connectMongo = async () => {
    connect(connectionUri)
        .then(() => console.log('Connected to mongo'))
        .catch((err) => console.error('Could not connect: ', err));;
};

export { connectMongo };