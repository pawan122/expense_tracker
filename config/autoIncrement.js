import mongoose from "mongoose";
import AutoIncrement from 'mongoose-sequence';

export const applyAutoIncrement = (schema, modelName) => {
    schema.plugin(AutoIncrement(mongoose), { id: `${modelName}_seq`, inc_field: '_id'});
}

